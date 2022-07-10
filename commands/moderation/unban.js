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
    permissions: ["MODERATE_MEMBERS"],
    permissionsBot: ["MODERATE_MEMBERS"],
    cooldown: 2, 
    async execute(interaction) {

        let utente = interaction.options.get("user")?.value;
        let reason = interaction.options.getString("reason") || "Nessun motivo"
        let member = interaction.guild.members.cache.get(utente);

        let embed = new Discord.MessageEmbed()
            .setTitle("[UNBAN] ")
            .setColor(configColor.VERDE)
            .addField("Utente👥", `<@${utente}>`)
            .addField("Reason⚠️", reason)
            .addField("Time⏰", `${moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss")}`, false)
            .addField("Moderator👮", interaction.member.toString())
            .addField("User ID: ", utente)

        interaction.reply({ embeds: [embed] })
        try {
            interaction.guild.members.unban(utente)
        }
        catch (err) {
            console.log(err)
            let embedError = new Discord.MessageEmbed()
                .setTitle("ERRORE<a:false:966789840475656202>")
                .setColor("RED")
                .setDescription("Controlla che l'utente sia bannato e che l'id sia corrretto")
            return interaction.reply({ embeds: [embedError] })
        }
    }
}