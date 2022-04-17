module.exports = {
    name: "rolestats",
    data: {
        name: "rolestats",
        description: "Comando per visualizzare le statistiche di un ruolo",
        options: [
            {
                name: "role",
                description: "Ruolo da visualizzare le statistiche",
                type: "ROLE",
                required: true
            }
        ]
    },
    async execute(interaction) {
        let ruolo = interaction.options.getRole("role")
        let memberCount = interaction.guild.members.cache.filter(member => member.roles.cache.find(role => role == ruolo)).size;
        let permessiRuolo = new Discord.Permissions(ruolo.permissions.bitfield);
        let elencoPermessi = "";

        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (permessiRuolo.has("ADMINISTRATOR")) {
            elencoPermessi = "👑ADMINISTRATOR";
        } else {
            let permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS"]
            for (var i = 0; i < permessi.length; i++) {
                if (permessiRuolo.has(permessi[i])) {
                    elencoPermessi += `- ${permessi[i]}\r`
                }
            }
        }
    
        let embed = new Discord.MessageEmbed()
            .setTitle("Role stats<:information:965163341989437451>")
            .setColor("#009cff")
            .setDescription("Tutte le statistiche di questo ruolo")
            .addField("Role", "<@&" + ruolo.id + ">")
            .addField("Role ID", "`" + ruolo.id + "`", true)
            .addField("Members 👥", "`" + memberCount.toString() + "`", true)
            .addField("Color 🏳️‍🌈", "`" + ruolo.hexColor + "`", true)
            .addField("Role created :alarm_clock:", "`" + ruolo.createdAt.toDateString() + "`", true)
            .addField("Permissions", "```" + elencoPermessi + "```", false)
        interaction.reply({ embeds: [embed] })
    }
}
