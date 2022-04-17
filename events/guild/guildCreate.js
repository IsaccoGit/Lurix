module.exports = {
    name: "guildCreate",
    async execute(guild) {
        let botCount = guild.members.cache.filter(member => member.user.bot).size;
        let memberCount = guild.memberCount - botCount;
        var lvlboost = guild.premiumTier

        if (lvlboost == "TIER_1") {
            var lvlboost = "1"
        } else if (lvlboost == "TIER_2") {
            var lvlboost = "2"
        } else if (lvlboost == "TIER_3") {
            var lvlboost = "3"
        } else if (lvlboost == "NONE") {
            var lvlboost = "0"
        }

        let canale = client.channels.cache.get(config.channels.guild_join)
        let embed = new Discord.MessageEmbed()
            .setColor(configColor.VERDE_ACQUA)
            .setTitle("New server⬆️")
            .setDescription("Il bot è stato aggiunto in un nuovo server (Total server:" + client.guilds.cache.size.toString() + " server e " + client.users.cache.size.toString() + " utenti)")
            .addField("Name📌", "```" + guild.name + "```")
            .addField("Server ID🪧", "```" + guild.id + "```", true)
            .addField("🔰 Boost level", "```Level " + lvlboost + " (" + guild.premiumSubscriptionCount + " boost)```", true)
            .addField("Members👥", "```Total: " + guild.members.cache.size.toString() + " | Members: " + memberCount.toString() + " | Bots: " + botCount.toString() + "```")
            .addField("Channel🔊", "```Total: " + guild.channels.cache.size + " | Text: " + guild.channels.cache.filter(c => c.type == "GUILD_TEXT").size.toString() + " | Voice: " + guild.channels.cache.filter(c => c.type == "GUILD_VOICE").size.toString() + " | Category: " + guild.channels.cache.filter(c => c.type == "GUILD_CATEGORY").size + "```")
            .addField("Roles🗞️", "```" + guild.roles.cache.size.toString() + "```" )
            .addField("Server created🗓️", "```" + moment(guild.createdAt).format("ddd DD MMM YYYY, HH:mm") + " (" + moment(guild.createdAt).fromNow() + ")```", false)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setTimestamp()
        canale.send({ embeds: [embed] })
    }
}