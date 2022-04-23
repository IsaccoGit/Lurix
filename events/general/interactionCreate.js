module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        try {
            const command = client.commands.get(interaction.commandName)
            if (!command) return
            
            if (interaction.bot) return
            if (!interaction.isCommand()) return

            let server = client.guilds.cache.get(interaction.guild.id);

            let embed = new Discord.MessageEmbed()
                .setColor(configColor.AZZURRO)
                .setTitle("Comando eseguito")
                .addField("Time⏰", "```" + `${moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss")}` + "```", false)
                .addField("Server🪧", "```ID: " + interaction.guild.id + " | Name: " + server.name + "```")
                .addField("Command💻", "```Name: " + interaction.commandName + "```")
                .addField("Autore🙎‍♂️","```" + interaction.user.username + "```")
                .addField("User ID: ", "```" + interaction.user.id + "```")
            client.channels.cache.get(config.channels.logsCommands).send({ embeds: [embed] })

            command.execute(interaction)
        } catch (error) {
            console.log(error)
        }
    }
}