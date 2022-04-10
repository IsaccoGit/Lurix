module.exports = {
    name: "meme",
    data: {
        name: "meme",
        description: "Comando per visualizzare dei meme"
    },
    execute(interaction) {
        let embed = new Discord.MessageEmbed()
            .setTitle("In arrivo...")
        interaction.reply({ embeds: [embed] })
    }
}