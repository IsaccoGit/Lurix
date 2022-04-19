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
        let Emoji;
        let a;
        let emojiList = "";
        let embed = new Discord.MessageEmbed()

        //TODO controlli
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (emoji.size == "0") {
            emoji = "*Non sono presenti emoji in questo server*"
        }

        emoji.forEach((emoji) => {

            if(emoji.animated == true) a = "a"
            if(emoji.animated == false) a = ""

            Emoji = `<${a}:${emoji.name}:${emoji.id}>`

            emojiList += Emoji + " **" + emoji.name + "** - `" + Emoji + "`\r"
            /*let emojiListLength = emojiList.length
            emojiList = emojiList.slice()*/
        })

        //TODO invio messaggio

        embed.setColor("#6143CB")
        embed.setAuthor({ name: `${server.name.toString()}`, iconURL: server.iconURL({ dynamic: true }) })
        embed.setTitle(`Emoji del server <a:coco:965152715753803818>`)
        embed.setDescription(`Tutte le emoji del server: **${server.name}**\r` + emojiList)
        embed.setFooter({ text: `Requested by ${interaction.user.tag} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

        interaction.reply({ embeds: [embed]})
    }
}