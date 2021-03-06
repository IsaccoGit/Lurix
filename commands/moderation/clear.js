const { Message } = require("discord.js")

module.exports = {
    name: "clear",
    data: {
        name: "clear",
        description: "Comando per eliminare messaggi",
        options: [
            {
                name: "count",
                description: "Il numero di messaggi da eliminare",
                type: "NUMBER",
                required: true
            }
        ]
    },
    permissions: ["MANAGE_MESSAGES"],
    permissionsBot: ["MANAGE_MESSAGES"],
    cooldown: 2, 
    async execute(interaction) {

        var count = interaction.options.getNumber("count")

        if (count < 1) {
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Numero non valido<a:false:966789840475656202>")
                .setDescription("I messaggi da eliminare devono essere maggiori a 1")
                .setTimestap()
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        if (count > 100) {
            let emebderror = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERRORE<a:false:966789840475656202>")
                .setDescription("Il limite di messaggi da eliminare è `100`")
            interaction.reply({ embeds: [emebderror], ephemeral: true })
            return
        }
        try {
            await interaction.channel.bulkDelete(count)

            let embed = new Discord.MessageEmbed()
                .setColor(configColor.VERDE)
                .setTitle("Comando eseguito correttamente<a:right:965152774532771850>")
                .setDescription(`Hai eliminato \`${count}\` messaggi`)
            await interaction.reply({ embeds: [embed], ephemeral: true })

        } catch (err) {
            let emebderror = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERRORE<a:false:966789840475656202>")
                .setDescription("Non è stato possibile eliminare messaggi più vecchi di due settimane (14 giorni)")
                .addField("Altrimenti", "Se i messaggi __**NON**__ sono più vecchi di 14 giorni segnala l'errore con `/bugreport`")
            interaction.reply({ embeds: [emebderror], ephemeral: true })
            console.log(err)
            return
        }
    }
}