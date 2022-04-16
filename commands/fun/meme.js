module.exports = {
    name: "meme",
    data: {
        name: "meme",
        description: "Comando per visualizzare dei meme"
    },
    async execute(interaction) {
        try {
            //TODO controlli
            if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
                interaction.deferReply()
                return
            }

            //TODO creazione meme
            fetch("https://www.reddit.com/r/memes/random/.json").then(resp =>
                resp.json()).then(respData => {

                    let permaLink = respData[0].data.children[0].data.permaLink;
                    let memeUrl = `https://www.reddit.com${permaLink}`
                    let memeFoto = respData[0].data.children[0].data.url;
                    let memeTitle = respData[0].data.children[0].data.title;
                    let upVotes = respData[0].data.children[0].data.ups;
                    let comments = respData[0].data.children[0].data.num_comments;
                    let footerTxT = `👍 ${upVotes} 💬 ${comments} | Requested by: ${interaction.user.username} ID: ${interaction.user.id}`

                    //TODO embed

                    let embed = new Discord.MessageEmbed()
                        .setColor(configColor.AZZURRO)
                        .setTitle(memeTitle)
                        .setURL(memeUrl)
                        .setImage(memeFoto)
                        .setFooter({ text: footerTxT })

                    //TODO buttons

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

                    //TODO invio messaggio
                    interaction.reply({ embeds: [embed], components: [row] });
                })
        } catch (err) {
            console.log(err)
        }
    }
}

