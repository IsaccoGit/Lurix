module.exports = {
    name: "eval",
    data: {
        name: "eval",
        description: "Comando per far eseguire un codice al bot",
        options: [
            {
                name: "code",
                description: "Codice da eseguire",
                type: "STRING",
                required: true
            }
        ]
    },
    execute(interaction) {
        if (interaction.member.id !== config.user.ownerDiscodId) {
            var embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato all'owner")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }
        try {
            let command = interaction.options.getString("code")
            let evaled = eval(command)
            let embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setTitle(`📦RISULTATO`)
                .addField(`Tipo:`, `\`\`\`prolog\n${typeof (evaled)}\`\`\``, true)
                .addField(`Entrata:`, `\`\`\`js\n${command}\`\`\``)
                .addField(`Uscita:`, `\`\`\`js\n${evaled} \`\`\``)

            let embedlogs = new Discord.MessageEmbed()
                .setTitle(`📦EVAL📦`)
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: ${interaction.user.username}, ID: \`${interaction.id}\``)
                .addField(`⌨️Codice Eseguito:`, "```js\r" + command.toString() + "```")
                .setColor(`YELLOW`)
                .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
            interaction.reply({ embeds: [embed] })
            client.channels.cache.get(config.channels.logs).send({ embeds: [embedlogs] })

        } catch (err) {
            let command = interaction.options.getString("code")
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .addField(`Entrata:`, `\`\`\`js\n${command}\`\`\``)
                .addField(`Errore:`, `\`\`\`js\n${err}\`\`\``)
                .setColor(`RED`)

            interaction.reply({ embeds: [embed] })
        }
    }
}