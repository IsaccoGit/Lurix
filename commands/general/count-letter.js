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
        let text = interaction.options.getString("text");
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (text.length > 1000) {
            let embed2 = new Discord.MessageEmbed()
                .setColor(configColor.VERDE)
                .setTitle("Comando eseguito correttamente<a:right:965152774532771850>")
                .setDescription(`Il tuo testo è lungo \`${text.length}\` caratteri`)
                .addField("Testo📄", "```Testo troppo lungo```")
            interaction.reply({ embeds: [embed2] })
            return
        }

        let embed2 = new Discord.MessageEmbed()
            .setColor(configColor.VERDE)
            .setTitle("Comando eseguito correttamente<a:right:965152774532771850>")
            .setDescription(`Il tuo testo è lungo \`${text.length}\` caratteri`)
            .addField("Testo📄", `\`\`\`${text}\`\`\``)
        interaction.reply({ embeds: [embed2] })

    }
}   