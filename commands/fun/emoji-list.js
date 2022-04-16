module.exports = {
    name: "emoji-list",
    data: {
        name: "emoji-list",
        description: "Lista delle emoji del server",
    },
    async execute(interaction) {
        //TODO server
        let server = client.guilds.cache.get(interaction.guild.id);

        //TODO controlli
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        console.log(server)

        //TODO invio messaggio

        let embed = new Discord.MessageEmbed()
            .setColor("#6143CB")
            .setAuthor({ name: `${server.name.toString()}`, iconURL: server.iconURL({ dynamic: true }) })
            .setTitle(`Emoji del server`)
            .setDescription("In arrivo...")
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
        interaction.reply({ embeds: [embed] })
    }
}