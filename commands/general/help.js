module.exports = {
    name: "help",
    data: {
        name: "help",
        description: "Comando per visualizzare tutti i comandi"
    },
    permissions: [],
    permissionsBot: ["MANAGE_MESSAGES"],
    cooldown: 10,
    execute(interaction) {

        var embed1 = new Discord.MessageEmbed()
            .setTitle(":robot: ALL COMMANDS :robot:")
            .setDescription(`Tutti i **comandi** disponibili all'interno di <@${client.application?.id}>
        
<a:arrowr:965152788738879528>**Prefisso** del bot: \`/\``)
            .addField("Categorie", `
I comandi sono divisi nelle seguenti categorie:
> :earth_americas: General
> :bar_chart: Statistics
> :joy: Fun
> :dollar: Ranking    
> :crown: Owner
_Seleziona la categoria dal menù qua sotto_`)

        var select = new Discord.MessageSelectMenu()
            .setCustomId(`helpCommandMenu`)
            .setPlaceholder('Select category...')
            .setMaxValues(1)
            .setMinValues(1)
            .addOptions({
                label: "General",
                emoji: "🌍",
                value: "helpGeneral",
                description: "/ping, /help, /twitch, /youtube..."
            })
            .addOptions({
                label: "Statistics",
                emoji: "📊",
                value: "helpStatistics",
                description: "/userstats, /avatar, /serverstats..."

            })
            .addOptions({
                label: "Fun",
                emoji: "😂",
                value: "helpFun",
                description: "/meme, /gaytest, /say..."
            })
            .addOptions({
                label: "Owner",
                emoji: "👑",
                value: "helpOwner",
                description: "/crash, /eval..."
            })
            .addOptions({
                label: "Moderation",
                emoji: "🔒",
                value: "helpModeration",
                description: "/kick, /mute, /tempban..."
            })
            .addOptions({
                label: "Home",
                emoji: "🏠",
                value: "helpHome",
                description: "Torna alla home"
            })
        var row = new Discord.MessageActionRow()
            .addComponents(select)
        interaction.reply({ embeds: [embed1], components: [row] })
    }
}