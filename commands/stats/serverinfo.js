module.exports = {
    name: "serverinfo",
    data: {
        name: "serverinfo",
        description: "Comando per visualizzare le informazioni del bot"
    },
    async execute(interaction) {
        let server = client.guilds.cache.get("950074461279887461");
        let botCount = server.members.cache.filter(member => member.user.bot).size;
        let memberCount = server.memberCount - botCount;

        let categoryCount = server.channels.cache.filter(c => c.type == "GUILD_CATEGORY").size;
        let textCount = server.channels.cache.filter(c => c.type == "GUILD_TEXT").size;
        let vocalCount = server.channels.cache.filter(c => c.type == "GUILD_VOICE").size;
        var lvlboost = server.premiumTier

        if (lvlboost == "TIER_1") {
            var lvlboost = "1"
        } else if (lvlboost == "TIER_2") {
            var lvlboost = "2"
        } else if (lvlboost == "TIER_3") {
            var lvlboost = "3"
        } else if (lvlboost == "NONE") {
            var lvlboost = "0"
        }

let embed = new Discord.MessageEmbed()
    .setTitle(server.name)
    .setDescription("Tutte le statistiche su questo server")
    .setThumbnail(server.iconURL({ dynamic: true }))
    .addField(":green_circle: Online users", "```" + server.members.cache.filter(user => !user?.presence?.status || user.presence.status != "offline").size + "```", true)
    .addField(":placard: Server ID", "```" + server.id + "```", true)
    .addField(":beginner: Boost level", "```Level " + lvlboost + " (" + server.premiumSubscriptionCount + " boost)```", true)
    .addField(":busts_in_silhouette: Members", "```Total: " + server.memberCount + " | Members: " + memberCount + " | Bots: " + botCount + "```", false)
    .addField(":loud_sound: Server categories and channels", "```Category: " + categoryCount + " | Text: " + textCount + " | Voice: " + vocalCount + "```", false)
    .addField(":calendar_spiral: Server created", "```" + moment(server.createdAt).format("ddd DD MMM YYYY, HH:mm") + " (" + moment(server.createdAt).fromNow() + ")```", false)

interaction.reply({ embeds: [embed] })
    }
}