module.exports = {
    name: "emoji-list",
    data: {
        name: "emoji-list",
        description: "Lista delle emoji del server",
    },
    async execute(interaction) {
        let server = client.guilds.cache.get(interaction.guild.id);
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        console.log(server)
        //console.log(emoji)

        let embed = new Discord.MessageEmbed()
            .setColor("#6143CB")
            .setAuthor({ name: `${server.name.toString()}`, iconURL: server.iconURL({ dynamic: true }) })
            .setTitle(`Emoji del server`)
            //.setDescription()
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
        interaction.reply({ embeds: [embed] })
    }
}