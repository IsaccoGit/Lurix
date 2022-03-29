module.exports = {
    name: "timeout",
    data: {
        name: "timeout",
        description: "Comando per in time out un utente",
        options: [
            {
                name: "user",
                description: "L'utente da mettere il timeout",
                type: "USER",
                required: true
            },
            {
                name: "time",
                description: "Tempo di timeout",
                type: "STRING",
                required: true
            },
            {
                name: "reason",
                description: "Reason del timeout",
                type: "STRING",
                required: false
            }
        ]
    },
    async execute(interaction) {
        let utente = interaction.options.getUser("user");
        let time = interaction.options.getString("time");
        let reason = interaction.options.getString("reason") || "Nessun motivo";
        let member = interaction.guild.members.cache.get(utente.id);
        let timeInMs = ms(time)

        if (!interaction.member.permissions.has('TIMEOUT_MEMBERS')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato allo staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (member.permissions.has('ADMINISTRATOR')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non puoi mettere in time out un amministratore uno staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (!timeInMs) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE❌")
                .setDescription("Tempo non valido")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }
        try {
            let embed = new Discord.MessageEmbed()
                .setAuthor("[TIME OUT] " + member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
                .setColor("#6143CB")
                .addField("Reason⚠️", reason)
                .addField("Time⏰", time)
                .addField("Ora", `${moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss")}`, false)
                .addField("Moderator👮", interaction.member.toString())
                .addField("User ID: ", member.user.id)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            interaction.reply({ embeds: [embed] })
        } catch { return }
        member.timeout(timeInMs, reason)
    }
}