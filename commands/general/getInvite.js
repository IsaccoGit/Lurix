module.exports = {
    name: "get-invite",
    data: {
        name: "get-invite",
        description: "comando per ottere l'invito del server",

    },
    permissions: ["CREATE_INSTANT_INVITE"],
    permissionsBot: ["CREATE_INSTANT_INVITE"],
    cooldown: 4, 
    async execute(interaction) {
        //TODO server
        let server = client.guilds.cache.get(interaction.guild.id)

        //TODO canale
        let canale = canaleServer = client.channels.cache.get(interaction.channel.id);

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