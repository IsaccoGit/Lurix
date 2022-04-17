module.exports = {
    name: "userinfo",
    data: {
        name: "userinfo",
        description: "Comando per visualizzare le informazioni di un utente",
        options: [
            {
                name: "user",
                description: "L'utente da visualizzare l'avatar",
                type: "USER",
                required: false
            }
        ]
    },
    async execute(interaction) {
        let user = interaction.options.getUser("user") || interaction.user;
        let utente = interaction.guild.members.cache.get(user.id);

        var status = utente.presence?.status;
        switch (status) {
            case "online": status = "Online"; break;
            case "offline": status = "Offline"; break;
            case "dnd": status = "Don't disturb"; break;
            case "idle": status = "Idle"; break;
        }

        const badge = await utente.user.flags
        const userFlags = badge.toArray()
        const elencoBadge = userFlags.length ? userFlags.map(flag => flag).join(" ") : 'Nessun badge'

        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        let embed = new Discord.MessageEmbed()
            .setTitle("Userstats - " + (utente.nickname ? utente.nickname : utente.user.username))
            .setDescription("Tutte le statistiche su questo utente<:information:965163341989437451>")
            .setThumbnail(utente.user.displayAvatarURL({ dynamic: true }))
            .addField(":receipt: User ID", "```" + utente.user.id + "```", true)
            .addField(":ok_hand: Status", "```" + (status || "Offline") + "```", true)
            .addField(":robot: Is a bot", utente.user.bot ? "```Yes```" : "```No```", true)
            .addField(":pencil: Account created", "```" + moment(utente.user.createdAt).format("ddd DD MMM YYYY, HH:mm") + " (" + moment(utente.user.createdAt).fromNow() + ")```", false)
            .addField(":red_car: Joined this server", "```" + moment(utente.joinedTimestamp).format("ddd DD MMM YYYY, HH:mm") + " (" + moment(utente.joinedTimestamp).fromNow() + ")```", false)
            .addField(":beginner: Badge", "```" + elencoBadge + "```", false)
        interaction.reply({ embeds: [embed] })
    }
}