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
                        value: 'on-line.'
                    },
                    {
                        name: 'idle',
                        value: 'idle.'
                    },
                    {
                        name: 'dnd',
                        value: 'dnd.'
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
                        value: 'watching.'
                    },
                    {
                        name: 'PLAYING',
                        value: 'playing.'
                    },
                    {
                        name: 'STREAMING',
                        value: 'streaming.'
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
        let status = interaction.options.getString("status")
        let activities = interaction.options.getString("activities")
        let activitiesText = interaction.options.getString("activitiesText")

        console.log(status)
        console.log(activities)
        console.log(activitiesText)
    }
}