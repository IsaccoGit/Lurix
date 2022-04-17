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
        let Emoji = server.emoji

        //TODO controlli
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }


        //TODO invio messaggio

        let embed = new Discord.MessageEmbed()
            .setColor("#6143CB")
            .setAuthor({ name: `${server.name.toString()}`, iconURL: server.iconURL({ dynamic: true }) })
            .setTitle(`Emoji del server <a:coco:965152715753803818> `)
            .setDescription(`Tutte le emoji del server: **${server.name}**`)
            server.forEach(server => { 
                if(Emoji == "animated"){
                    let a = `a`
                } else a = ""
                embed.addField(Emoji, `<${a}:${Emoji.name}:${Emoji.id}>`)
            })
            console.log(Emoji)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
        interaction.reply({ embeds: [embed] })
    }
}