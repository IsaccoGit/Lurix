module.exports = {
    name: "unban",
    data: {
        name: "unban",
        description: "Comando per sbannare un utente",
        options: [
            {
                name: "user",
                description: "L'utente da bannare (bisogna usare l'id)",
                type: "USER",
                required: true
            },
            {
                name: "reason",
                description: "Reason del sban",
                type: "STRING",
                required: false
            }
        ]
    },
    async execute(interaction) {
        let utente = interaction.options.get("user")?.value;
        let reason = interaction.options.getString("reason") || "Nessun motivo"
        let member = interaction.guild.members.cache.get(utente);
        let memberId = interaction.guild.members.cache.get(utente.id);
        let server = client.guilds.cache.get(interaction.guild.id);

        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (!member.bannable) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE❌")
                .setDescription("Il bot non ha il permesso")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato allo staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        try {
            interaction.guild.members.unban({ user: utente, reason: reason })
            let embed = new Discord.MessageEmbed()
                .setTitle("[UNBAN] " + memberId.user.tag)
                .setColor(configColor.VERDE)
                .addField("Reason⚠️", reason)
                .addField("Time⏰", `${moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss")}`, false)
                .addField("Moderator👮", interaction.member.toString())
                .addField("User ID: ", member.user.id)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            await interaction.reply({ embeds: [embed] })

        } catch (err) {
            let embederr = new Discord.MessageEmbed()
                .setTitle("ERRORE❌")
                .setDescription("C'è stato un errore, verifica che l'id dell'utente sia corretto")
                .setColor("RED")
            interaction.reply({ embeds: [embederr], ephemeral: true })
            return
        }
    }
}