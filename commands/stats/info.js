module.exports = {
    name: "info",
    data: {
        name: "info",
        description: "Comando per visualizzare le info del bot"
    },
    execute(interaction) {
        var embed = new Discord.MessageEmbed()
            .setTitle("__Info BOT__")
            .setDescription("Ecco le informazioni riguardo il bot")
            .addField("Linguaggio", "`JavaScript`<:downloads:949762253459165284>", true)
            .addField("Libreria", "`discord.js v13.6.0`", true)
            .addField("Creazione bot⏰", "`01/03/2022`", true)
            .addField("Developer🖥️", "`cappella_smegma#4457`", true)
            .setColor(configColor.AZZURRO)
        interaction.reply({ embeds: [embed] })
    }
}