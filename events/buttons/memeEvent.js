module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isButton()) return

        let messageMeme = interaction.message.embeds[0].footer.text.slice(-18, 100)

        if (interaction.user.id !== messageMeme) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE❌")
                .setDescription("Non puoi eseguire un bottone non tuo")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }


        if (interaction.customId == "memeStop") {

            let embedStop = interaction.message.embeds[0]
            
            let buttonGo = new Discord.MessageButton()
                .setLabel("Avanti")
                .setStyle("SUCCESS")
                .setCustomId("memeAvanti")
                .setDisabled();

            let buttonStop = new Discord.MessageButton()
                .setLabel("Stop")
                .setStyle("DANGER")
                .setCustomId("memeStop")
                .setDisabled();

            let row = new Discord.MessageActionRow()
                .addComponents(buttonStop)
                .addComponents(buttonGo);

            interaction.update({ embeds: [embedStop], components: [row] });

        }
        if (interaction.customId == "memeAvanti") {
            try {
                fetch("https://www.reddit.com/r/memes/random/.json").then(resp =>
                    resp.json()).then(respData => {

                        let permaLink = respData[0].data.children[0].data.permaLink;
                        let memeUrl = `https://www.reddit.com${permaLink}`
                        let memeFoto = respData[0].data.children[0].data.url;
                        let memeTitle = respData[0].data.children[0].data.title;
                        let upVotes = respData[0].data.children[0].data.ups;
                        let comments = respData[0].data.children[0].data.num_comments;

                        let embed = new Discord.MessageEmbed()
                            .setColor(configColor.AZZURRO)
                            .setTitle(memeTitle)
                            .setURL(memeUrl)
                            .setImage(memeFoto)
                            .setFooter({ text: `👍 ${upVotes} 💬 ${comments} | Requested by: ${interaction.user.username} ID: ${interaction.user.id}` })

                        let buttonGo = new Discord.MessageButton()
                            .setLabel("Avanti")
                            .setStyle("SUCCESS")
                            .setCustomId("memeAvanti");

                        let buttonStop = new Discord.MessageButton()
                            .setLabel("Stop")
                            .setStyle("DANGER")
                            .setCustomId("memeStop");

                        let row = new Discord.MessageActionRow()
                            .addComponents(buttonStop)
                            .addComponents(buttonGo);

                        interaction.reply({ embeds: [embed], components: [row] });
                    })
            } catch (err) {
                console.log(err)
            }
        }
    }
}