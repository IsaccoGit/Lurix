module.exports = {
    name: "count-letters",
    data: {
        name: "count-letters",
        description: "Comando per contare le lettere di un testo",
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
        const text = interaction.options.getString("text");
        if (text.lenght > 1500) {
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERRORE:x:")
                .setDescription("Non puoi mandare messaggi con più di 2000 caratteri")
            interaction.reply({ embed: [embed] })
            return
        }
        let embed = new Discord.MessageEmbed()
            .setColor(configColor.VERDE)
            .setTitle("Comando eseguito correttamente")
            .setDescription(`Il tuo testo è lungo ${text.lenght} caratteri`)
        interaction.reply({ embeds: [embed] })
    }
}   