module.exports = {
    name: "help",
    data: {
        name: "help",
        description: "Comando per visualizzare tutti i comandi"
    },
    execute(interaction) {
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (!interaction.guild.me.permissions.has("MANAGE_MESSAGE")) {
            var embednperm = new Discord.MessageEmbed()
                .setTitle("NON HO IL PERMESSO<a:false:966789840475656202>")
                .setDescription("Non ho il permesso di modificare i messaggi")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

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

        var row = new Discord.MessageActionRow()
            .addComponents(select)
        interaction.reply({ embeds: [embed1], components: [row] })
    }
}