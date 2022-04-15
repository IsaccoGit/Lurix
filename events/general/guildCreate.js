module.exports = {
    name: "guildCreate",
    async execute(guild) {
        let canale = client.channels.cache.get(config.channels.logs)
        let embed = new Discord.MessageEmbed()
            .setColor(configColor.VERDE_ACQUA)
            .setTitle("New server")
            .addField("Name", guild.name)
            .addField("Server ID", guild.id)
        canale.send({ embeds: [embed] })
    }
}