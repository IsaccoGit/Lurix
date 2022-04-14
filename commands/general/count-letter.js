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
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (text.length > 1000) {
            let embed1 = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERRORE❌")
                .setDescription("Non puoi mandare messaggi con `1000` o più caratteri")
            interaction.reply({ embeds: [embed1] })
            return
        }
        let embed2 = new Discord.MessageEmbed()
            .setColor(configColor.VERDE)
            .setTitle("Comando eseguito correttamente")
            .setDescription(`Il tuo testo è lungo \`${text.length}\` caratteri`)
            .addField("Testo📄", `\`\`\`${text}\`\`\``)
        interaction.reply({ embeds: [embed2] })

    }
}   