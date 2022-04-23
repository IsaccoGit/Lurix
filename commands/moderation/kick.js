module.exports = {
    name: "kick",
    data: {
        name: "kick",
        description: "Comando per espellere un utente",
        options: [
            {
                name: "user",
                description: "L'utente da kickkare",
                type: "USER",
                required: true
            },
            {
                name: "reason",
                description: "Reason del kick",
                type: "STRING",
                required: false
            }
        ]
    },
    async execute(interaction) {
        let utente = interaction.options.getUser("user");
        let reason = interaction.options.getString("reason") || "Nessun motivo"
        let member = interaction.guild.members.cache.get(utente.id);
        let server = client.guilds.cache.get(interaction.guild.id);

        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (member.id == client.application.id) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE<a:false:966789840475656202>")
                .setDescription("Non puoi kickare il bot")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (member.id == interaction.user.id) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE<a:false:966789840475656202>")
                .setDescription("Non puoi kickare te stesso")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (!member.kickable) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE<a:false:966789840475656202>")
                .setDescription("Il bot non ha il permesso")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO<a:false:966789840475656202>")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato allo staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (member.permissions.has('BAN_MEMBERS')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO<a:false:966789840475656202>")
                .setDescription("Non puoi kickare uno staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }


        let dm = true

        let embedDm = new Discord.MessageEmbed()
            .setTitle(`Sei stato kikkato dal server: \`${server.name}\``)
            .setColor("#6143CB")
            .setThumbnail(server.iconURL({ dynamic: true }))
            .addField("Reason⚠️", reason)
            .addField("Time⏰", `${moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss")}`, false)
            .addField("Moderator👮", interaction.member.toString())
        member.send({ embeds: [embedDm] }).catch(() => { dm = false })

        let embed = new Discord.MessageEmbed()
            .setAuthor({ name: "[KICK] " + member.user.tag, iconUrl: member.user.displayAvatarURL({ dynamic: true }) })
            .setColor("#6143CB")
            .addField("Reason⚠️", reason)
            .addField("Time⏰", `${moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss")}`, false)
            .addField("Moderator👮", interaction.member.toString())
            .addField("User ID: ", member.user.id)
        if (dm = false) embed.addField("WARN🚧", "**Non** è stato possibile mandare il messaggio in dm all'utente")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed] })

        member.kick({ reason: reason })
    }
}