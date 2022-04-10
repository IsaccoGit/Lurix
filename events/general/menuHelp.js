module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (!interaction.isSelectMenu()) return;

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
        switch (interaction.values[0]) {
            case "helpGeneral": {
                var embed1 = new Discord.MessageEmbed()
                    .setTitle("🌍General commands🌍")
                    .setColor("#9B59B6")
                    .setDescription("Comandi generali, specifi del server")
                    .addField("/help", "Lista completa dei comandi del bot")
                    .addField("/ping", "Info del server, come ping e ram")
                    .addField("/github", "Comando per visualizzare la repository di github del bot")
                    .addField("/link", "comando per visualizzare il link di invito del bot e del server")
                    .addField("/avatar", "comando per visualizzare l'avatar di un utente")
                    .addField("/info", "comando per visualizzare le info del bot")
                    .addField("/bugreport", "comando per reportare un bug")
                    .addField("/count-letters", "comando per contare le lettere di un testo")
                    .addField("Comandi in arrivo...", "il bot non è completato quindi non ci sono tutti i comandi")
            }
        }
        switch (interaction.values[0]) {
            case "helpStatistics": {
                var embed1 = new Discord.MessageEmbed()
                    .setTitle("📊Statistics commands📊")
                    .setColor("#BCC0C0")
                    .setDescription("Comandi per avere statistiche di utenti, canali, ruoli o altro")
                    .addField("/serverinfo", "comando per visualizzare le informazioni di un server")
                    .addField("/userinfo", "comando per visualizzare le informazioni di un utente")
                    .addField("/server", "comando per visualizzare statistiche del bot")
                    .addField("Comandi in arrivo...", "il bot non è completato quindi non ci sono tutti i comandi")
            }
        }
        switch (interaction.values[0]) {
            case "helpFun": {
                var embed1 = new Discord.MessageEmbed()
                    .setTitle("😂Fun commands😂")
                    .setColor("#F1C40F")
                    .setDescription("Comandi fun, di divertimento e di minigames")
                    .addField("/meme", "comando per visualizzare meme")
                    .addField("Comandi in arrivo...", "il bot non è completato quindi non ci sono tutti i comandi")
            }
        }
        switch (interaction.values[0]) {
            case "helpOwner": {
                var embed1 = new Discord.MessageEmbed()
                    .setTitle("👑Owner commands👑")
                    .setColor("#2ECC71")
                    .setDescription("Comandi riservati all'owner")
                    .addField("/crash 👑", "Comando per far crashare il bot, utilizzabile solo dall'owner")
                    .addField("/eval 👑", "Comando per far eseguire un codice al bot, utilizzabile solo dall'owner")
                    .addField("/restart 👑", "Comando per far restartare il bot, utilizzabile solo dall'owner")
                    .addField("Comandi in arrivo...", "il bot non è completato quindi non ci sono tutti i comandi")
            }
        }
        switch (interaction.values[0]) {
            case "helpModeration": {
                var embed1 = new Discord.MessageEmbed()
                    .setTitle("🔒Moderation commands🔒")
                    .setColor("#3498DB")
                    .setDescription("Comandi di moderazione per lo staff")
                    .addField("/ban", "comando per bannare un utente")
                    .addField("/unban", "comando per sbannare un utente")
                    .addField("/clear", "comando per eliminare messaggi")
                    .addField("/timeout", "comando per mettere in time out un utente")
                    .addField("/slowmode", "comando per mettere la slowmode")
                    .addField("/kick", "comando per espellere un utente")
                    .addField("Comandi in arrivo...", "il bot non è completato quindi non ci sono tutti i comandi")
            }
        }
        interaction.update({ embeds: [embed1], components: [row] })
    },
};