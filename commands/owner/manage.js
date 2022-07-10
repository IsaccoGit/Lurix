const { ThreadChannel } = require("discord.js")

//client.user.setActivity("/help | " + client.guilds.cache.size.toString() + " SERVERS | " + client.users.cache.size.toString() + " USERS" , { type: "WATCHING" })
module.exports = {
    name: "manage",
    data: {
        name: "manage",
        description: "Comando per maneggiare le attività del bot",
        options: [
            {
                name: 'status',
                description: 'opzione per scegliere lo statod del bot (On line..., Non disturbare...)',
                type: 'STRING',
                required: true,
                choices: [
                    {
                        name: 'on line',
                        value: 'on line'
                    },
                    {
                        name: 'idle',
                        value: 'idle'
                    },
                    {
                        name: 'dnd',
                        value: 'dnd'
                    },
                ],
            },
            {
                name: 'activities',
                description: 'opzione per scegliere l\'attività (Sta guardando..., Sta giocando a...)',
                type: 'STRING',
                required: true,
                choices: [
                    {
                        name: 'WATCHING',
                        value: 'WATCHING'
                    },
                    {
                        name: 'PLAYING',
                        value: 'PLAYING'
                    },
                ],
            },
            {
                name: 'activities-text',
                description: 'opzionde per settare lo stato',
                type: 'STRING',
                required: false,
            },
        ],
    },
    async execute(interaction) {
        let server = client.guilds.cache.get(interaction.guild.id)
        let status = interaction.options.getString("status")
        let activities = interaction.options.getString("activities")
        var activities_text = interaction.options.getString("activities-text") || "LURIX"

        if (interaction.member.id !== config.user.ownerDiscodId) {
            var embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO<a:false:966789840475656202>")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato all'owner")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (activities_text == "BASE_STATUS") {
            var activities_text = "/help | " + client.guilds.cache.size.toString() + " SERVERS | " + client.users.cache.size.toString() + " USERS"
        }

        client.user.setActivity(activities_text, { type: activities })
        client.user.setStatus(status)

        switch (status) {
            case "on line": status = "Online"; break;
            case "dnd": status = "Don't disturb"; break;
            case "idle": status = "Idle"; break;
        }

        switch (activities) {
            case "PLAYING": activities = "Playing"; break;
            case "WATCHING": activities = "Watching"; break;
        }

        let embed = new Discord.MessageEmbed()
            .setColor("#7400ff")
            .setTitle("Bot maneggiato🛠️")
            .addField("Status🎯", "```" + status + "```")
            .addField("Attività🎮", "```" + activities + "```")
            .addField("Testo attività📄", "```" + activities_text + "```")
        interaction.reply({ embeds: [embed] })

        let embedLogs = new Discord.MessageEmbed()
            .setColor("#7400ff")
            .setTitle("Bot maneggiato🛠️")
            .addField("Server🖥️", "```Name: " + server.name.toString() + " | ID:" + interaction.guild.id + "```")
            .addField("Time⏰", "```" + moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss")+ "```")
            .addField("Status🎯", "```" + status + "```")
            .addField("Attività🎮", "```" + activities + "```")
            .addField("Testo attività📄", "```" + activities_text + "```")
        client.channels.cache.get(config.channels.logs).send({ embeds: [embedLogs] })
    }
}