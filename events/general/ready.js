module.exports = {
    name: "ready",
    async execute() {
        /*client.guilds.cache.forEach(guild => {
            client.commands.forEach(command => {
                guild.commands.create(command.data)
            })
        })*/

        // const passDb = "d5r79wQU5GrTYDye"

        //const db = await MongoClient.connect(`mongodb+srv://Isacco:${process.env.passDb}@isaccocluster.r9mk6.mongodb.net/test`, { useNewUrlParser: true, useUnifiedTopology: true })

        //global.database = db.db("Isacco")
        
        client.user.setActivity("/help | " + client.guilds.cache.size.toString() + " servers", { type: "WATCHING" })

        const embedReady = new Discord.MessageEmbed()
            .setTitle("Bot ONLINE")
            .setColor("#3ebd45")
            .addField(":alarm_clock: Time", moment(date.getTime()).format("ddd DD MMM YYYY, HH:mm:ss"))
        client.channels.cache.get(configId.channelsId.logs).send({ embeds: [embedReady] });

        console.log("► MONGODB on line")

        console.log("► LURIX BOT on line");
    }
}