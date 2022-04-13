module.exports = {
    name: "say",
    data: {
        name: "say",
        description: "comando per far dire qualcosa al bot",
        options: [
            {
                name: "text",
                description: "Testo da inserire",
                type: "STRING",
                required: true
            }
        ]
    },
    async execute(interaction) {
        let embed = new Discord.MessageEmbed()
            .setColor(configColor.VERDE)
            .setTitle("Comando eseguito correttamente")
            .setDescription("Comando say eseguito correttamente")
        interaction.reply({ embeds: [embed], ephemeral: true })

        const text = interaction.options.getString("text");
        let canale = client.channels.cache.get(interaction.channel.id);
        canale.send(text)
    }
}