module.exports = {
    name: "ready",
    async execute() {

        /*client.guilds.cache.forEach(guild => {
            client.commands.forEach(command => {
                guild.commands.create(command.data)
            })
        })*/

        client.commands.forEach(async commands => {
            const comandoRegistrato = await client.application?.commands.create(commands.data)
        })
        
        client.user.setActivity("/help | " + client.guilds.cache.size.toString() + " SERVERS | " + client.users.cache.size.toString() + " USERS", { type: "WATCHING" })

        const embedReady = new Discord.MessageEmbed()
            .setTitle(`Bot ONLINE - ${process.env.local ? `Local` : `Host`}`)
            .setColor("#3ebd45")
            .addField(":alarm_clock: Time", moment(date.getTime()).format("ddd DD MMM YYYY, HH:mm:ss"))
        client.channels.cache.get(config.channels.logs).send({ embeds: [embedReady] });

        //console.log("► MONGODB on line")

        console.log("► LURIX BOT on line");

        //!-------------------------TEST-------------------------!

        //let server = client.guilds.cache.get("933824004836458496");

        //client.api.applications(client.user.id).commands().delete();

    }
}