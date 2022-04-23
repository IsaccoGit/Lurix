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

        //TODO controlli
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (emoji.size == "0") {
            emojiList = "*Non sono presenti emoji in questo server<a:false:966789840475656202>*"
        }

        emoji.forEach((emoji) => {

            if (emoji.animated == true) a = "a"
            if (emoji.animated == false) a = ""

            Emoji = `<${a}:${emoji.name}:${emoji.id}>`

            emojiList += Emoji + " **" + emoji.name + "** - `" + Emoji + "`\r"
        })

        //TODO invio messaggio
        if (emojiList.length >= 3900 && emojiList.length < 8000) {
            let embed = new Discord.MessageEmbed()
                .setColor("#6143CB")
                .setAuthor({ name: `${server.name.toString()}`, iconURL: server.iconURL({ dynamic: true }) })
                .setTitle(`Emoji del server <a:coco:965152715753803818>`)
                .setDescription(`Tutte le emoji del server: **${server.name}**\r` + emojiList.slice(0, 3900) + "...")

            let embed1 = new Discord.MessageEmbed()
                .setColor("#6143CB")
                .setDescription( "..."+ emojiList.slice(3900, 7500))
                .setFooter({ text: `Requested by ${interaction.user.tag} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            interaction.reply({ embeds: [embed, embed1] })
            return
        }

        let embed = new Discord.MessageEmbed()
            .setColor("#6143CB")
            .setAuthor({ name: `${server.name.toString()}`, iconURL: server.iconURL({ dynamic: true }) })
            .setTitle(`Emoji del server <a:coco:965152715753803818>`)
            .setDescription(`Tutte le emoji del server: **${server.name}**\r` + emojiList)
            .setFooter({ text: `Requested by ${interaction.user.tag} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        interaction.reply({ embeds: [embed] })
    }
}