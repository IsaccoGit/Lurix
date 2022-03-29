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

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato allo staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (member.permissions.has('KICK_MEMBERS')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non puoi kickkare uno staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }
        
        try {
            let embed = new Discord.MessageEmbed()
                .setAuthor("[KICK] " + member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
                .setColor("#6143CB")
                .addField("Reason⚠️", reason)
                .addField("Time⏰", `${moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss")}`, false)
                .addField("Moderator👮", interaction.member.toString())
                .addField("User ID: ", member.user.id)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            interaction.reply({ embeds: [embed] })
        } catch { return }
        await member.kick({ reason: reason })
    }
}