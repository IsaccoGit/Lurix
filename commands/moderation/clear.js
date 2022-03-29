const { monthsShort } = require("moment")
const ms = require("ms")

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
    async execute(interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
            var embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato allo staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        var count = interaction.options.getNumber("count")

        if (count < 1) {
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Numero non valido")
                .setDescription("I messaggi da eliminare devono essere maggiori a 1")
                .setTimestap()
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        if (count > 100) {
            let emebderror = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERRORE❌")
                .setDescription("Il limite di messaggi da eliminare è `100`")
            interaction.reply({ embeds: [emebderror], ephemeral: true })
            return
        }
        try {
            await interaction.channel.bulkDelete(count)

            let embed = new Discord.MessageEmbed()
            .setColor(configColor.VERDE)
            .setTitle("Comando eseguito correttamente")
            .setDescription(`Hai eliminato \`${count}\` messaggi`)
        interaction.reply({ embeds: [embed], ephemeral: true })

        } catch (err) {
            let emebderror = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERRORE❌")
                .setDescription("Non è stato possibile eliminare messaggi più vecchi di una settimana")
                .addField("Altrimenti", "Se i messaggi __**NON**__ sono più vecchi di 14 giorni segnala l'errore con `/bugreport`")
            interaction.reply({ embeds: [emebderror], ephemeral: true })
            console.log(err)
            return
        }
    }
}