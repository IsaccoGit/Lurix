module.exports = {
    name: "avatar",
    data: {
        name: "avatar",
        description: "Comando per l'immagine profilo di un utente",
        options: [
            {
                name: "user",
                description: "L'utente da visualizzare l'avatar",
                type: "USER",
                required: false
            }
        ]
    },
    permissions: [],
    permissionsBot: [],
    cooldown: 2, 
    execute(interaction) {
        //TODO definizioni
        let utente = interaction.options.getUser("user") || interaction.user;
        let member = interaction.guild.members.cache.get(utente.id);

        //TODO invio messaggi

        var embed = new Discord.MessageEmbed()
            .setTitle("Avatar <a:arrowr:965152788738879528> " + (utente.username))
            .setDescription(`L'avatar di questo utente
Other formats: **[.gif](${member.displayAvatarURL({ dynamic: true, size: 1024, format: `gif` })})** | **[.jpeg](${member.displayAvatarURL({ dynamic: false, size: 1024, format: `jpeg` })})** | **[.webp](${member.displayAvatarURL({ dynamic: false, size: 1024, format: `webp` })})** | **[.png](${member.displayAvatarURL({ dynamic: false, size: 1024, format: `png` })})**`)
            .setImage(utente.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 1024
            }))
        interaction.reply({ embeds: [embed] })
    }
}