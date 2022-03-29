module.exports = {
    name: "ping",
    data: {
        name: "ping",
        description: "Comando per visualizzare il ping"
    },
    execute(interaction) {
        
        var embed = new Discord.MessageEmbed()
            .setTitle("Pong")
            .setColor("#6CA1FF")
            .addField(":stopwatch: Uptime", "```" + `${ms(client.uptime, { long: true })} - ${moment(new Date().getTime() - client.uptime).format("ddd DD MMM, HH:mm:ss")}` + "```")
            .addField(":turtle: Ping", "```" + `${client.ws.ping}ms` + "```", true)
            .addField(":floppy_disk: Ram", "```" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB` + "```", true)
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}