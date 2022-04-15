module.exports = {
    name: "guildCreate",
    async execute(guild) {
        let botCount = guild.members.cache.filter(member => member.user.bot).size;
        let memberCount = guild.memberCount - botCount;

        let canale = client.channels.cache.get(config.channels.guild_join)
        let embed = new Discord.MessageEmbed()
            .setColor(configColor.VERDE_ACQUA)
            .setTitle("New server")
            .setDescription("Il bot è stato aggiunto in un nuovo server")
            .addField("Name", "`" + guild.name + "`")
            .addField("Server ID","`" + guild.id + "`")
            .addField("Members", "`" + guild.members.cache.size.toString() + "`")
            .addField("User", memberCount, true)
            .addField("Bot", botCount, true)
            /*.addField("Channel", "`" + guild.channels.cache.size)
            .addField("Canali testuali", "`" + guild.channels.cache.filter(c => c.type == "GUILD_TEXT").size, true)
            .addField("Canali vocali", "`" + guild.channels.cache.filter(c => c.type == "GUILD_VOICE").size, true)
            .addField(":calendar_spiral: Server created", "```" + moment(guild.createdAt).format("ddd DD MMM YYYY, HH:mm") + " (" + moment(guild.createdAt).fromNow() + ")```", false)
            .setThumbnail(guild.iconURL({ dynamic: true }))*/
            .setTimestamp()
        canale.send({ embeds: [embed] })

        console.log(guild)
    }
}