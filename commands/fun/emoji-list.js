const { Emoji } = require("discord.js");

module.exports = {
    name: "emoji-list",
    data: {
        name: "emoji-list",
        description: "Lista delle emoji del server",
    },
    async execute(interaction) {
        //TODO server
        let serverId = interaction.guild.id
        let server = client.guilds.cache.get(serverId);
        let emoji = server.emojis.cache;
        let totPage = Math.ceil(emoji.size / 10)

        let page = 1;
        let embed = new Discord.MessageEmbed()

        //TODO controlli
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (emoji.size == "0") {
            emoji = "*Non sono presenti emoji in questo server*"
        }

        let Emoji = client.guilds.cache.get(interaction.guild.id).emojis.cache.sort((a, b) => b.id - a.id)

        for (let i = 10 * (page - 1); 1 < 10 * page; i++) {
            if (Emoji[i]) {
                embed.addField(`#${i + 1} ${emoji} ${emoji.name}`, `\`${emoji}\`\r`)
            }
        }

        //TODO invio messaggio

        let buttonAv = new Discord.MessageButton()
            .setLabel("Avanti")
            .setStyle("SUCCESS")
            .setCustomId("emojiAvanti")
            .setEmoji("▶️")

        let buttonInd = new Discord.MessageButton()
            .setLabel("Indietro")
            .setStyle("SUCCESS")
            .setCustomId("emojiIndietro")
            .setEmoji("◀️")

        if (page == 1) buttonInd.setDisabled()
        if (page == totPage) buttonAv.setDisabled()

        let row = new Discord.MessageActionRow()
            .addComponents(buttonInd)
            .addComponents(buttonAv);

        embed.setColor("#6143CB")
        embed.setAuthor({ name: `${server.name.toString()}`, iconURL: server.iconURL({ dynamic: true }) })
        embed.setTitle(`Emoji del server <a:coco:965152715753803818>`)
        embed.setDescription(`Tutte le emoji del server: **${server.name}**`)
        embed.setFooter({ text: `Requested by ${interaction.user.tag} - Page: ${page}/${totPage} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

        interaction.reply({ embeds: [embed], components: [row] })
    }
}