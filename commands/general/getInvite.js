module.exports = {
    name: "get-invite",
    data: {
        name: "get-invite",
        description: "comando per ottere l'invito del server",
        options: [
            {
                name: "canale",
                description: "canale da creare l'invito",
                type: "CHANNEL",
                required: false
            },
            {
                name: "server",
                description: "ID del server da creare l'invito",
                type: "NUMBER",
                required: false
            },
        ]
    },
    async execute(interaction) {
        let getServerID = interaction.options.getNumber("server") || interaction.guild.id;
        let canale = interaction.options.getChannel("canale") || interaction.channel.id;
        let server = client.guilds.cache.get(getServerID)

        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (!server.me.permissions.has("CREATE_INSTANT_INVITE")) {
            let embedErr = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERORE❌")
                .setDescription("Non ho il permesso di creare inviti")
            interaction.reply({ embeds: [embedErr] })
            return
        }

        if (!interaction.user.permissions.has("CREATE_INSTANT_INVITE")) {
            let embedErr = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERORE❌")
                .setDescription("Non ho il permesso di creare inviti")
            interaction.reply({ embeds: [embedErr] })
            return
        }

        if (getServerID.length !== 18) {
            let embedErr = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERORE❌")
                .setDescription("Id server non valido")
            interaction.reply({ embeds: [embedErr] })
            return
        }

        if(getServerID && !server) {
            let embedErr = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERORE❌")
                .setDescription("Id server non valido")
            interaction.reply({ embeds: [embedErr] })
            return
        }

        if (canale.type !== "GUILD_TEXT") {
            let embedErr = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERORE❌")
                .setDescription("Canale non valido, il canale scelto deve essere testuale")
            interaction.reply({ embeds: [embedErr] })
            return
        }

        if (canale && server) {
            let embedErr = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERORE❌")
                .setDescription("Canale inesistente in quel server")
            interaction.reply({ embeds: [embedErr] })
            return
        }

        let invite = await canale.createInvite({ temporary: false, maxAge: 0 })

        let embed = new Discord.MessageEmbed()
            .setColor(configColor.VERDE)
            .setTitle("Nuovo invito")
            .setDescription(`Un nuovo invito è stato creato nel server **${server.name}**`)
            .addField("Invito🪧", invite.url)
            .addField("Server", server.name)
            .addField("Canale📄", canale)
            .setTimestamp()
        interaction.reply({ embeds: [embed] })
    }
}