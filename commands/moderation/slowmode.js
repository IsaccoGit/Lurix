module.exports = {
    name: "slowmode",
    data: {
        name: "slowmode",
        description: "Comando per mettere la slowmode",
        options: [
            {
                name: "time",
                description: "Tempo di slowmode; Inserire off per disattivare la slowmode",
                type: "STRING",
                required: true
            }
        ]
    },
    async execute(interaction) {
        var time = interaction.options.getString("time");
        var timeInMs = ms(time)

        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato allo staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (timeInMs > 21600000) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE❌")
                .setDescription("Tempo non valido, il tempo deve essere minore a 6 ore")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (time == "off" || time == "no" || time == "0") {

            interaction.channel.setRateLimitPerUser(0)
            let embed = new Discord.MessageEmbed()
                .setColor(configColor.VERDE)
                .setTitle("Comando eseguito correttamente")
                .setDescription(`Hai \`disattivato\` la slowmode di del canale ${interaction.channel.toString()}`)
            interaction.reply({ embeds: [embed], ephemeral: true })
            return

        } else if (!timeInMs) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE❌")
                .setDescription("Tempo non valido")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return

        } else if (timeInMs < 1000) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE❌")
                .setDescription("Tempo non valido, il tempo deve essere maggiore a 1 secondo")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return

        } else {
            interaction.channel.setRateLimitPerUser(timeInMs)
            let embed = new Discord.MessageEmbed()
                .setColor(configColor.VERDE)
                .setTitle("Comando eseguito correttamente")
                .setDescription(`Hai eliminato impostato la slwomode a \`${time}\` del canale ${interaction.channel.toString()}`)
            interaction.reply({ embeds: [embed], ephemeral: true })
        }
    }
}