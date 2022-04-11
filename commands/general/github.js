module.exports = {
    name: "github",
    data: {
        name: "github",
        description: "Comando per la repository di github del bot"
    },
    execute(interaction) {
        let embed = new Discord.MessageEmbed()
            .setTitle("GitHub")
            .setDescription("Link github alla **repository pubblica** del bot")
            .addField("<:Botlogo:949293564192510002> Lurix Bot", `
[Clicca qui](https://github.com/IsaccoGit/Lurix) - Tutto il codice open-source del bot.`)
            .setThumbnail("https://i.postimg.cc/rpKN8qn2/Github-Logo.png")
            .setColor(configColor.AZZURRO)
        interaction.reply({ embeds: [embed] })
    }
}