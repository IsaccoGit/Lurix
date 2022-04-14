module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        try {
            let server = client.guilds.cache.get(interaction.guild.id);
            if (interaction.bot) return
            if (!interaction.isCommand()) return
            console.log(server.name)

            const command = client.commands.get(interaction.commandName)
            if (!command) return
    
            command.execute(interaction)
        } catch (error) {
            console.log(error)
        }
    }
}