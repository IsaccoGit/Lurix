module.exports = {
    name: "bugreport",
    data: {
        name: "bugreport",
        description: "Comando per reportare bug",
        options: [
            {
                name: "bug",
                description: "Bug da reportare",
                type: "STRING",
                required: true
            }
        ]
    },
    execute(interaction) {
        let bug = interaction.options.getString("bug")

        let embed = new Discord.MessageEmbed()
            .setTitle(":beetle: Bug reportato :beetle:")
            .setColor("#77B256")
            .setDescription(`**Grazie** per aver segnalato questo problema. È già stato **consegnato** allo staff che lo **risolverà** a breve`)
            .addField(":page_facing_up: Text", bug)
        interaction.reply({ embeds: [embed] })

        let embed1 = new Discord.MessageEmbed()
            .setTitle(":beetle: Bug report :beetle:")
            .setColor("#6DA54C")
            .addField(":alarm_clock: Time", moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss"), true)
            .addField(":bust_in_silhouette: User", `${interaction.user.username} (ID: ${interaction.id})`, false)
            .addField("Text", bug)

        client.channels.cache.get(config.channels.bugreport).send({ embeds: [embed1] });
    }
}