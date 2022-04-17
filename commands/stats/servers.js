module.exports = {
    name: "server",
    data: {
        name: "server",
        description: "Comando per visualizzare tutti i server in cui è presente il bot"
    },
    async execute(interaction) {
        let server = client.guilds.cache.get(interaction.guild.id);
        
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        let embed = new Discord.MessageEmbed()
            .setColor("#6CA1FF")
            .setTitle("Servers")
            .setDescription("Tutti i server in cui è presente il bot<:information:965163341989437451>")
            .addField("Servers 💻", client.guilds.cache.size.toString())
            .addField("Members 👥", client.users.cache.size.toString())
            .setFooter({ text: server.name, iconURL: server.iconURL({ dynamic: true }) })
            .setTimestamp()
        interaction.reply({ embeds: [embed] })
    }
}

//client.guilds.cache.forEach(guilds => console.log(guilds.name))