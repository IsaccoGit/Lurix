module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        try {
            const command = client.commands.get(interaction.commandName)
            if (!command) return
            
            if (interaction.bot) return
            if (!interaction.isCommand()) return

            let server = client.guilds.cache.get(interaction.guild.id);
            let utente = interaction.guild.members.cache.get(interaction.user.id);

            let embed = new Discord.MessageEmbed()
                .setColor(configColor.AZZURRO)
                .setAuthor({ name: interaction.user.username, iconURL: utente.user.displayAvatarURL({ dynamic: true }), url: 'https://discord.js.org' })
                .setTitle("Comando eseguito")
                .addField("Time⏰", "```" + `${moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss")}` + "```", false)
                .addField("Server🪧", "```ID: " + interaction.guild.id + " | Name: " + server.name + "```")
                .addField("Command💻", "```Name: /" + interaction.commandName + "```")
                .addField("Autore🙎‍♂️","```" + interaction.user.username + "```")
                .addField("User ID: ", "```" + interaction.user.id + "```")
                .setThumbnail(server.iconURL({ dynamic: true }))
            client.channels.cache.get(config.channels.logsCommands).send({ embeds: [embed] })

            command.execute(interaction)
        } catch (error) {
            console.log(error)
        }
    }
}