module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        try {
            if (interaction.bot) return
            if (!interaction.isCommand()) return
    
            const command = client.commands.get(interaction.commandName)
            if (!command) return
    
            command.execute(interaction)
        } catch (error) {
            console.log(error)
        }
    }
}