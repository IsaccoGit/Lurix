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
        const canale = client.channels.cache.get(interaction.channel.id)

        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (!interaction.guild.me.permissions.has('MANAGE_CHANNELS')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO<:warn:965152728240254976>")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato allo staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO<:warn:965152728240254976>")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato allo staff")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (time == "off" || time == "no" || time == "0") {
            interaction.channel.setRateLimitPerUser(0)
            let embed = new Discord.MessageEmbed()
                .setColor(configColor.VERDE)
                .setTitle("Comando eseguito correttamente<a:right:965152774532771850>")
                .setDescription(`Hai \`disattivato\` la slowmode del canale ${interaction.channel.toString()}`)
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        if (!timeInMs) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE<:warn:965152728240254976>")
                .setDescription("Tempo non valido")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (timeInMs > 21600000) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE<:warn:965152728240254976>")
                .setDescription("Tempo non valido, il tempo deve essere minore a 6 ore")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (timeInMs < 1000) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE<:warn:965152728240254976>")
                .setDescription("Tempo non valido, il tempo deve essere maggiore a 1 secondo")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return

        }

        canale.setRateLimitPerUser(timeInMs / 1000)
        let embed = new Discord.MessageEmbed()
            .setColor(configColor.VERDE)
            .setTitle("Comando eseguito correttamente<a:right:965152774532771850>")
            .setDescription(`Hai eliminato impostato la slwomode a \`${time}\` del canale ${canale.toString()}`)
        await interaction.reply({ embeds: [embed]})
    }
}