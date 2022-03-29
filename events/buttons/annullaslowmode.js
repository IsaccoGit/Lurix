module.exports = {
    name: "interactionCreate",
    execute(interaction) {
        if (!interaction.isButton()) return
        if (interaction.customId == `AnnullaSlowmode`) {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                var embednperm = new Discord.MessageEmbed()
                    .setTitle("NON HAI IL PERMESSO❌")
                    .setDescription("Non hai il permesso per eseguire questo comando, \rE' un comando riservato allo staff")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }
            let button = new Discord.MessageButton()
                .setStyle(`SECONDARY`)
                .setLabel(`Slowmode Annnullata`)
                .setCustomId(`AnnullaSlowmode`)
                .setDisabled()
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            let embed = new Discord.MessageEmbed()
                .setTitle(`⛓️Slowmode Da Spam Annullato⛓️`)
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`💬Canale:`, `${interaction.channel}`)
                .addField(`🔨Moderatore:`, `Nome: **${interaction.user.username}**, ID: **${interaction.user.id}**\n${interaction.user.toString()}`)
                .setColor(`GREEN`)
                .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
            client.channels.cache.get(configId.channelsId.logs).send({ embeds: [embed] })
            interaction.channel.setRateLimitPerUser(0)
            interaction.update({ components: [row] })
        }
    }
}