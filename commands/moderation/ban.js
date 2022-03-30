module.exports = {
    name: "ban",
    data: {
        name: "ban",
        description: "Comando per bannare un utente",
        options: [
            {
                name: "user",
                description: "L'utente da bannare",
                type: "USER",
                required: true
            },
            {
                name: "reason",
                description: "Reason del ban",
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

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato allo staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (member.permissions.has('BAN_MEMBERS')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non puoi bannare uno staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        try {
            let embedDm = new Discord.MessageEmbed()
                .setTitle(`Sei stato bannato dal server: ${server.name}`)
                .setColor("#6143CB")
                .setThumbnail(server.iconURL({ dynamic: true }))
                .addField("Reason", reason)
                .addField("Moderator", interaction.user.username)
            member.send({ embed: [embedDm] })
            
            let embed = new Discord.MessageEmbed()
                .setAuthor("[BAN] " + member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
                .setColor("#6143CB")
                .addField("Reason⚠️", reason)
                .addField("Time⏰", `${moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss")}`, false)
                .addField("Moderator👮", interaction.member.toString())
                .addField("User ID: ", member.user.id)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            interaction.reply({ embeds: [embed] })
        } catch { return }
        await member.ban({ reason: reason })
    }
}