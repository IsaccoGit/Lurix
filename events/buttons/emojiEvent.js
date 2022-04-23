module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        //TODO controlli
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (!interaction.guild.me.permissions.has("MANAGE_MESSAGE")) {
            var embednperm = new Discord.MessageEmbed()
                .setTitle("NON HO IL PERMESSO<a:false:966789840475656202>")
                .setDescription("Non ho il permesso di modificare i messaggi")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        if (!interaction.isButton()) return

        //TODO definzione 
        
        let serverId = interaction.guild.id
        let server = client.guilds.cache.get(serverId);
        let embed = new Discord.MessageEmbed()
        let footerLength = interaction.message.embeds[0].footer.text.length
        let messageMeme = interaction.message.embeds[0].footer.text.slice(-18, footerLength)
        let page = interaction.message.embeds[0].footer.text.slice(-26, -25)
        let totPage = interaction.message.embeds[0].footer.text.slice(-24, -23)


        if (interaction.customId == "emojiAvanti") {
            //TODO controlli
            if (interaction.user.id !== messageMeme) {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi eseguire un bottone non tuo")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }
            //TODO emoji list

            page++

            //TODO invio messaggio
            embed.setColor("#6143CB")
            embed.setAuthor({ name: `${server.name.toString()}`, iconURL: server.iconURL({ dynamic: true }) })
            embed.setTitle(`Emoji del server <a:coco:965152715753803818>`)
            embed.setDescription(`Tutte le emoji del server: **${server.name}**`)
            embed.setFooter({ text: `Requested by ${interaction.user.tag} - Page: ${page}/${totPage} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

            let buttonAv = new Discord.MessageButton()
                .setLabel("Avanti")
                .setStyle("SUCCESS")
                .setCustomId("emojiAvanti")
                .setEmoji("▶️")

            let buttonInd = new Discord.MessageButton()
                .setLabel("Indietro")
                .setStyle("SUCCESS")
                .setCustomId("emojiIndietro")
                .setEmoji("◀️")

            if (page == 1) buttonInd.setDisabled()
            if (page == totPage) buttonAv.setDisabled()

            let row = new Discord.MessageActionRow()
                .addComponents(buttonInd)
                .addComponents(buttonAv);

            interaction.update({ embeds: [embed], components: [row] })
        }
        if (interaction.customId == "emojiIndietro") {
            //TODO controlli
            if (interaction.user.id !== messageMeme) {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi eseguire un bottone non tuo")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }
            //TODO emoji list

            
            page--

            //TODO invio messaggio
            embed.setColor("#6143CB")
            embed.setAuthor({ name: `${server.name.toString()}`, iconURL: server.iconURL({ dynamic: true }) })
            embed.setTitle(`Emoji del server <a:coco:965152715753803818>`)
            embed.setDescription(`Tutte le emoji del server: **${server.name}**`)
            embed.setFooter({ text: `Requested by ${interaction.user.tag} - Page: ${page}/${totPage} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })


            let buttonAv = new Discord.MessageButton()
                .setLabel("Avanti")
                .setStyle("SUCCESS")
                .setCustomId("emojiAvanti")
                .setEmoji("▶️")

            let buttonInd = new Discord.MessageButton()
                .setLabel("Indietro")
                .setStyle("SUCCESS")
                .setCustomId("emojiIndietro")
                .setEmoji("◀️")

            if (page == 1) buttonInd.setDisabled()
            if (page == totPage) buttonAv.setDisabled()

            let row = new Discord.MessageActionRow()
                .addComponents(buttonInd)
                .addComponents(buttonAv);

            interaction.update({ embeds: [embed], components: [row] })
        }
    }
}