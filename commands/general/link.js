module.exports = {
    name: "link",
    data: {
        name: "link",
        description: "Comando per visualizzare i link importandi"
    },
    async execute(interaction) {
        var embed = new Discord.MessageEmbed()
            .setTitle("__Link IMPORTANTI__")
            .addField("Link bot", "Clicca [qui](https://discord.com/api/oauth2/authorize?client_id=958268971478556743&permissions=8&scope=bot%20applications.commands) per invitare il bot")
            .addField("Link server", "Ecco il link del server: https://discord.gg/dsFYz6mscX")
            .setColor(configColor.AZZURRO)
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}   
