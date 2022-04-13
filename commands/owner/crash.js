module.exports = {
    name: "crash",
    data: {
        name: "crash",
        description: "Comando per far crashare il bot"
    },
    execute(interaction) {
        if (interaction.member.id !== config.user.ownerDiscodId) {
            var embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato all'owner")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }
        const embedReady = new Discord.MessageEmbed()
            .setTitle("Bot CRASHATO")
            .setColor("#ff0000")
            .addField(":alarm_clock: Time", moment(date.getTime()).format("ddd DD MMM YYYY, HH:mm:ss"))

        const embed = new Discord.MessageEmbed()
            .setTitle("BOT crashato con successo")
            .setColor("#ff0000")
            .addField(":alarm_clock: Hai fatto crashare il bot con successo:", moment(date.getTime()).format("ddd DD MMM YYYY, HH:mm:ss"))
        interaction.reply({ embeds: [embed] })
        client.channels.cache.get(config.channels.logs).send({ embeds: [embedReady] });
        console.clear()
        console.error(`SPEGNIMENTO DEL BOT`)
        setTimeout(async () => {
            await client.destroy()
        }, 1000)
    }
}