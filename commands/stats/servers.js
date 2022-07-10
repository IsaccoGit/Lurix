module.exports = {
    name: "server",
    data: {
        name: "server",
        description: "Comando per visualizzare tutti i server in cui è presente il bot"
    },
    permissions: [],
    permissionsBot: [],
    async execute(interaction) {
        let server = client.guilds.cache.get(interaction.guild.id);
        
        let embed = new Discord.MessageEmbed()
            .setColor("#6CA1FF")
            .setTitle("<:information:965163341989437451>Servers<:information:965163341989437451>")
            .setDescription("Tutti i server in cui è presente il bot")
            .addField("Servers 💻", client.guilds.cache.size.toString())
            .addField("Members 👥", client.users.cache.size.toString())
            .setFooter({ text: server.name, iconURL: server.iconURL({ dynamic: true }) })
            .setTimestamp()
        interaction.reply({ embeds: [embed] })
    }
}

//client.guilds.cache.forEach(guilds => console.log(guilds.name))