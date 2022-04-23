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
        //TODO text
        let text = interaction.options.getString("text");

        //TODO controlli

        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (text.includes("@everyone") || text.includes("@here")) {
            let embed1 = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("ERRORE<a:false:966789840475656202>")
                .setDescription("Non puoi taggare everyone e here")
            interaction.reply({ embeds: [embed1] })
            return
        }
        
        //TODO invio messaggio

        let embed = new Discord.MessageEmbed()
            .setColor(configColor.VERDE)
            .setTitle("Comando eseguito correttamente <a:right:965152774532771850>")
            .setDescription("Comando say eseguito correttamente")
        interaction.reply({ embeds: [embed], ephemeral: true })

        let canale = client.channels.cache.get(interaction.channel.id);
        
        canale.send(text)
    }
}