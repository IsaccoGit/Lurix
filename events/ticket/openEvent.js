module.exports = {
    name: "interactionCreate",
    permissions: [],
    permissionsBot: ["MANAGE_CHANNELS"],
    async execute(interaction) {

        let serverID = interaction.guild.id
        let server = interaction.channel.guild

        if (!interaction.isButton()) return

        if (interaction.customId == "openTicket") {
            database.collection("lurix").find({ serverId: serverID }).toArray(async function (err, result) {
                let lurix = result.find(x => x.serverId == serverID);

                if (!interaction.guild.me.permissions.has("CREATE_CHANNEL")) {
                    var embednperm = new Discord.MessageEmbed()
                        .setTitle("NON HO IL PERMESSO<a:false:966789840475656202>")
                        .setDescription("Non ho il permesso di creare canali")
                        .setColor("RED")
                    interaction.reply({ embeds: [embednperm], ephemeral: true })
                    return
                }

                if (server.channels.cache.find(canale => canale.topic == `User ID: ${interaction.user.id}`)) {
                    let embed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle("ERRORE<a:false:966789840475656202>")
                        .setDescription("Hai già un ticket aperto")
                    interaction.reply({ embeds: [embed], ephemeral: true })
                    return
                }

                server.channels.create(`ticket-${interaction.user.username}`, {
                    type: "GUILD_TEXT",
                    topic: `User ID: ${interaction.user.id}`,
                    parent: lurix.ticket.category,
                    permissionOverwrites: []
                }).then(async (canale) => {
                    let embedUser = new Discord.MessageEmbed()
                        .setColor(`#2f3136`)
                        .setTitle(`Ticket Aperto`)
                        .setDescription(`Hai aperto il ticket ${canale.toString()}`)
                        .setFooter({ text: `Aperto da ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    interaction.reply({ embeds: [embedUser], ephemeral: true })
                    let embed = new Discord.MessageEmbed()
                        .setColor(`BLUE`) //close #2f3136
                        .setTitle(`Ticket Aperto`)
                        .setDescription(`<@${interaction.user.id}> ha aperto un ticket. \rPer chiudere il ticket, cliccare \`🔒Close\``)
                        .setAuthor({ name: `Aperto da ${interaction.user.username}`, iconUrl: interaction.user.displayAvatarURL({ dynamic: true }) })
                    let buttonDelete = new Discord.MessageButton()
                        .setLabel("CLOSE")
                        .setStyle("DANGER")
                        .setCustomId("closeTicket")
                        .setEmoji(`🔒`)
                    global.ticketClose = true
                    let row = new Discord.MessageActionRow()
                        .addComponents(buttonDelete)
                    canale.send({ embeds: [embed], components: [row] })
                })
            })
        }
    }
}