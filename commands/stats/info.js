module.exports = {
    name: "info",
    data: {
        name: "info",
        description: "Comando per visualizzare le info del bot"
    },
    permissions: [],
    permissionsBot: [],
    execute(interaction) {

        var embed = new Discord.MessageEmbed()
            .setTitle("__<:information:965163341989437451>Info BOT<:information:965163341989437451>__")
            .setDescription("Ecco le informazioni riguardo il bot")
            .addField("Linguaggio", "`JavaScript`<:downloads:949762253459165284>", true)
            .addField("Libreria Principale", "`discord.js v13.6.0`", true)
            .addField("Creazione bot⏰", "`01/03/2022`", true)
            .addField("Developer🖥️", "`cappella_smegma#4457`", true)
            .setColor(configColor.AZZURRO)
        interaction.reply({ embeds: [embed] })
    }
}