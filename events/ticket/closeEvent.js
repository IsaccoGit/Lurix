module.exports = {
    name: "interactionCreate",
    async execute(interaction) {

        if (!interaction.isButton()) return

        if (interaction.customId == "closeTicket") {
            let channel = interaction.channel

            let opened = true;
            var second = 10;

            let embed = new Discord.MessageEmbed()
                .setTitle(`Ticket Chiuso`)
                .setDescription(`Tra \`10 secondi\` il ticket verrà chiuso...`)
                .setColor(`RED`)
            let button = new Discord.MessageButton()
                .setStyle(`DANGER`)
                .setLabel(`Annulla`)
                .setCustomId(`AnnullaChiusuraTicket`)
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            global.chiudiTicket = true

            channel.send({ embeds: [embed], components: [row] }).then(msg => {
                if (opened == true) {
                    const ticketInterval = setInterval(() => {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Ticket Chiuso`)
                            .setDescription(`Tra \`${second - 1} secondi\` il ticket verrà chiuso...`)
                            .setColor(`RED`)
                        msg.edit({ embeds: [embed] }).catch(() => { opened = false })
                        second = second -1
                    }, 1000);
                } if (second < 0 ) clearInterval(ticketInterval)
            })
            interaction.deferUpdate()
            setTimeout(() => {
                if (chiudiTicket == false) return
                channel.delete().catch(() => { })
            }, 1000 * 10)
        }
    }
}