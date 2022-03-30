module.exports = {
    name: "help",
    data: {
        name: "help",
        description: "Comando per visualizzare tutti i comandi"
    },
    execute(interaction) {
        var embed1 = new Discord.MessageEmbed()
            .setTitle(":robot: ALL COMMANDS :robot:")
            .setDescription(`Tutti i **comandi** disponibili all'interno di <@${client.application?.id}>
        
**Prefisso** del bot: \`/\``)
            .addField("Categorie", `
I comandi sono divisi nelle seguenti categorie:
:earth_americas: General
:bar_chart: Statistics
:joy: Fun
:dollar: Ranking    
:lock: Moderation
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
                label: "Ranking",
                emoji: "💵",
                value: "helpRanking",
                description: "/rank, /lb..."
            })
            .addOptions({
                label: "Moderation",
                emoji: "🔒",
                value: "helpModeration",
                description: "/kick, /mute, /tempban..."
            })

        var row = new Discord.MessageActionRow()
            .addComponents(select)
        interaction.reply({ embeds: [embed1], components: [row] })
    }
}