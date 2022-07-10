module.exports = {
    name: "link",
    data: {
        name: "link",
        description: "Comando per visualizzare i link importanti"
    },
    permissions: [],
    permissionsBot: [],
    cooldown: 2, 
    async execute(interaction) {

        var embed = new Discord.MessageEmbed()
            .setTitle("__Link IMPORTANTI__")
            .addField("Link bot", "Clicca <a:arrowr:965152788738879528> [qui](https://discord.com/api/oauth2/authorize?client_id=958268971478556743&permissions=8&scope=bot%20applications.commands) per invitare il bot")
            .addField("Link server", "Ecco il link del server <a:arrowr:965152788738879528> https://discord.gg/dsFYz6mscX")
            .addField("Link bot Completo", "||Link completo del bot: https://discord.com/api/oauth2/authorize?client_id=958268971478556743&permissions=8&scope=bot%20applications.commands||")
            .setColor(configColor.AZZURRO)
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}   
