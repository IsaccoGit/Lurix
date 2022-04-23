module.exports = {
    name: "get-invite",
    data: {
        name: "get-invite",
        description: "comando per ottere l'invito del server",

    },
    async execute(interaction) {
        //TODO server
        let server = client.guilds.cache.get(interaction.guild.id)

        //TODO canale
        let canale = canaleServer = client.channels.cache.get(interaction.channel.id);

        //TODO controlli permessi

        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (!interaction.guild.me.permissions.has("CREATE_INSTANT_INVITE")) {
            let embedErr = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERORE<a:false:966789840475656202>")
                .setDescription("Non ho il permesso di creare inviti")
            interaction.reply({ embeds: [embedErr], ephemeral: true })
            return
        }

        if (!interaction.member.permissions.has("CREATE_INSTANT_INVITE")) {
            let embedErr = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERORE<a:false:966789840475656202>")
                .setDescription("Non hai il permesso di creare inviti")
            interaction.reply({ embeds: [embedErr], ephemeral: true })
            return
        }

        //TODO creazione invito

        let invite = await canaleServer.createInvite({ temporary: false, maxAge: 0 })

        //TODO invio messaggio

        let embed = new Discord.MessageEmbed()
            .setColor(configColor.VERDE)
            .setTitle("Nuovo invito<a:right:965152774532771850>")
            .setDescription(`Un nuovo invito è stato creato nel server **${server.name}**`)
            .addField("Invito🪧", invite.url)
            .addField("Server🖥️", "```" + server.name + "```")
            .addField("Canale📄", "```Name: " + canaleServer.name + " | ID: " + canale + "```")
            .setThumbnail(server.iconURL({ dynamic: true }))
            .setTimestamp()
        interaction.reply({ embeds: [embed] })
    }
}