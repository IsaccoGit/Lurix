module.exports = {
    name: "ready",
    async execute() {
        client.commands.forEach(async commands => {
            await client.application?.commands.create(commands.data)
        })

        client.user.setActivity("/help | " + client.guilds.cache.size.toString() + " SERVERS | " + client.users.cache.size.toString() + " USERS", { type: "WATCHING" })

        const embedReady = new Discord.MessageEmbed()
            .setTitle(`Bot ONLINE - ${process.env.local ? `Local` : `Host`}`)
            .setColor("#3ebd45")
            .addField(":alarm_clock: Time", moment(date.getTime()).format("ddd DD MMM YYYY, HH:mm:ss"))
        client.channels.cache.get(config.channels.logs).send({ embeds: [embedReady] });

        console.log("► LURIX BOT on line");

        const db = await MongoClient.connect(`mongodb+srv://isaccoclusterbot:${process.env.passDb}@cappellacluster.tq2yy.mongodb.net/test`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        global.database = db.db("cappellacluster")

        await database.collection("lurix").find().toArray(function (err, result) {
            lurixList = result
            console.log("► MongoDB connesso");
        })

        //!-------------------------TEST-------------------------!

        //let server = client.guilds.cache.get("933824004836458496");
    }
}