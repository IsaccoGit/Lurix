module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isButton()) return
        
        if (interaction.customId == "AnnullaChiusuraTicket") {
            interaction.deferUpdate()

            interaction.message.delete().catch(() => {})

            global.chiudiTicket = false
        }
    }
}