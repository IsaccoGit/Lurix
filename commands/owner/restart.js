module.exports = {
    name: "restart",
    data: {
        name: "restart",
        description: "Comando per far restartare il bot"
    },
    async execute(interaction) {
        if(interaction.member.id !== configId.userId.ownerDiscodId) {
            var embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO❌")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato all'owner")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        let embed = new Discord.MessageEmbed()
            .setTitle(`Restart`)
            .setDescription(`Il bot è in fase di **restart**!!\nA breve tornerà online!`)
            .setColor(`RED`)
        let embedlogs = new Discord.MessageEmbed()
            .setTitle(`🔂RESTART🔂`)
            .setDescription(`**⚠️IL BOT È IN FASE DI RIAVVIO⚠️**`)
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨Moderatore:`, `Nome: ${interaction.user.username}, ID: ${interaction.id}`)
            .setColor(`RED`)

        console.clear()
        console.error(`Restart del bot...`)
        await interaction.reply({ embeds: [embed] })

        await client.channels.cache.get(configId.channelsId.logs).send({ embeds: [embedlogs] });
        process.exit()
    }
}
