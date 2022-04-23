module.exports = {
    name: "restart",
    data: {
        name: "restart",
        description: "Comando per far restartare il bot"
    },
    async execute(interaction) {
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }
        
        if(interaction.member.id !== config.user.ownerDiscodId) {
            var embednperm = new Discord.MessageEmbed()
                .setTitle("NON HAI IL PERMESSO<a:false:966789840475656202>")
                .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato all'owner")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        let embed = new Discord.MessageEmbed()
            .setTitle(`Restart<a:verify:965154403885670401>`)
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

        await client.channels.cache.get(config.channels.logs).send({ embeds: [embedlogs] });
        process.exit()
    }
}
