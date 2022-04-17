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
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (!interaction.guild.me.permissions.has("DELETE_MESSAGE")) {
            var embednperm = new Discord.MessageEmbed()
                .setTitle("NON HO IL PERMESSO<:warn:965152728240254976>")
                .setDescription("Non ho il permesso di eliminare messaggi")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
            var embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO<:warn:965152728240254976>")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato allo staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        var count = interaction.options.getNumber("count")

        if (count < 1) {
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Numero non valido<:warn:965152728240254976>")
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
                .setTitle("Comando eseguito correttamente<a:right:965152774532771850>")
                .setDescription(`Hai eliminato \`${count}\` messaggi`)
            interaction.reply({ embeds: [embed], ephemeral: true })

        } catch (err) {
            let emebderror = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERRORE❌")
                .setDescription("Non è stato possibile eliminare messaggi più vecchi di due settimane (14 giorni)")
                .addField("Altrimenti", "Se i messaggi __**NON**__ sono più vecchi di 14 giorni segnala l'errore con `/bugreport`")
            interaction.reply({ embeds: [emebderror], ephemeral: true })
            console.log(err)
            return
        }
    }
}