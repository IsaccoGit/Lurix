module.exports = {
    name: "setup",
    data: {
        name: "setup",
        description: "comando per settare: i log, il canale del counting, il comando di welcome, di leave e per i ticket",
        options: [
            {
                name: "logs",
                description: "canale dei log",
                type: "CHANNEL",
                required: false
            },
            {
                name: "welcome-leave",
                description: "canale per i messaggi di welcome e leave",
                type: "CHANNEL",
                required: false
            },
            {
                name: "ticket-channel",
                description: "canale per i ticket",
                type: "CHANNEL",
                required: false
            },
            {
                name: "ticket-category",
                description: "categoria per i ticket",
                type: "CHANNEL",
                required: false
            },
            {
                name: "counting",
                description: "canale del counting",
                type: "CHANNEL",
                required: false
            }
        ]
    },
    async execute(interaction) {
        let serverID = interaction.guild.id
        let server = client.guilds.cache.get(serverID)

        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (!interaction.member.permissions.has("MANAGE_CHANNEL")) {
            let embednperm = new Discord.MessageEmbed()
                .setTitle("ERRORE<a:false:966789840475656202>")
                .setDescription("Non hai il permesso per esguire questo comando")
                .setColor("RED")
            interaction.reply({ embeds: [embednperm], ephemeral: true })
            return
        }

        let logs = interaction.options.getChannel("logs")
        if (logs) {
            let logsC = client.channels.cache.get(logs.id)
            if (!logsC || logsC.type !== "GUILD_TEXT") {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi selezionare canali vocali o categorie")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }
        }

        let welcome_leave = interaction.options.getChannel("welcome-leave")
        if (welcome_leave) {
            let wlC = client.channels.cache.get(welcome_leave.id)
            if (!wlC || wlC.type !== "GUILD_TEXT") {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi selezionare canali vocali o categorie")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }
        }


        let ticketC = interaction.options.getChannel("ticket-category")
        if (ticketC) {
            let cC = client.channels.cache.get(ticketC.id)
            if (!cC || cC.type !== "GUILD_CATEGORY") {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi selezionare canali vocali")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }
        }

        let ticketCh = interaction.options.getChannel("ticket-channel")
        if (ticketCh) {
            let chC = client.channels.cache.get(ticketCh.id)
            if (!chC || chC.type !== "GUILD_TEXT") {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi selezionare canali vocali o categorie")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }
        }

        let counting = interaction.options.getChannel("counting")
        if (counting) {
            let countingC = client.channels.cache.get(counting.id)
            if (!countingC || countingC.type !== "GUILD_TEXT") {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi selezionare canali vocali o categorie")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }

        }
        try {
            database.collection("lurix").find({ serverId: serverID }).toArray(function (err, result) {
                let lurix = result.find(x => x.serverId == serverID);
                if (!lurix) {
                    let embednperm = new Discord.MessageEmbed()
                        .setTitle("ERRORE<a:false:966789840475656202>")
                        .setDescription("Questo server non è presente nel database, prova a reinvitarlo, se non va utilizza /bugreport altrimeni entra nel server di supporto")
                        .setColor("RED")
                    interaction.reply({ embeds: [embednperm], ephemeral: true })
                    return
                }
                let embedF = new Discord.MessageEmbed()

                if (logs) {
                    let embedlog = new Discord.MessageEmbed()
                        .setColor(configColor.VERDE)
                        .setTitle("Bot settato<a:right:965152774532771850>")
                        .setDescription("Canale dei logs settato")
                    embedF.addField("<a:arrowr:965152788738879528>Log", logs.toString())
                    client.channels.cache.get(logs.id).send({ embeds: [embedlog] })
                    database.collection("lurix").updateOne({ serverId: serverID }, {
                        $set: {
                            logs: {
                                status: true,
                                channel: logs.id
                            }
                        }
                    })
                }

                if (welcome_leave) {
                    let embedwl = new Discord.MessageEmbed()
                        .setColor(configColor.VERDE)
                        .setTitle("Bot settato<a:right:965152774532771850>")
                        .setDescription("Canale dei welcome e dei leave settato")
                    embedF.addField("<a:arrowr:965152788738879528>Welcome leave channel", welcome_leave.toString())
                    client.channels.cache.get(welcome_leave.id).send({ embeds: [embedwl] })
                    database.collection("lurix").updateOne({ serverId: serverID }, {
                        $set: {
                            welcome_leave: {
                                status: true,
                                channel: welcome_leave.id
                            }
                        }
                    })
                }


                if (ticketC) {
                    let embedch = new Discord.MessageEmbed()
                        .setColor(configColor.VERDE)
                        .setTitle("Bot settato<a:right:965152774532771850>")
                        .setDescription("Canale dei ticket settato")
                    embedF.addField("<a:arrowr:965152788738879528>Ticket", "Category: " + ticketC.name)
                    client.channels.cache.get(ticketCh.id).send({ embeds: [embedch] })
                    database.collection("lurix").updateOne({ serverId: serverID }, {
                        $set: {
                            ticket: {
                                stauts: true,
                                category: ticketC.id,
                                channel: lurix.ticket.channel
                            }
                        }
                    })
                    embedF.addField("<a:arrowr:965152788738879528>Ticket Category", "Category: " + ticketC.name)
                }

                if (ticketCh) {
                    let embedch = new Discord.MessageEmbed()
                        .setColor(configColor.VERDE)
                        .setTitle("Bot settato<a:right:965152774532771850>")
                        .setDescription("Canale dei ticket settato")
                    embedF.addField("<a:arrowr:965152788738879528>Ticket channel", "Channel: " + ticketCh.toString())
                    client.channels.cache.get(ticketCh.id).send({ embeds: [embedch] })
                    database.collection("lurix").updateOne({ serverId: serverID }, {
                        $set: {
                            ticket: {
                                stauts: true,
                                category: ticketC.id,
                                channel: lurix.ticket.channel
                            }
                        }
                    })
                    embedF.addField("<a:arrowr:965152788738879528>Ticket", "Channel: " + ticketCh.toString())
                }

                if (counting) {
                    let embedc = new Discord.MessageEmbed()
                        .setColor(configColor.VERDE)
                        .setTitle("Bot settato<a:right:965152774532771850>")
                        .setDescription("Canale del counting settato")
                    embedF.addField("<a:arrowr:965152788738879528>Counting", counting.toString())
                    client.channels.cache.get(counting.id).send({ embeds: [embedc] })
                    database.collection("lurix").updateOne({ serverId: serverID }, {
                        $set: {
                            counting: {
                                status: true,
                                server: {
                                    channels: counting.id,
                                    number: lurix.counting.server.number,
                                    lastUtente: lurix.counting.server.lastUtente,
                                    bestScore: lurix.counting.server.bestScore
                                },
                            }
                        }
                    })
                }
                if (!counting && !ticketC && !ticketCh && !welcome_leave && !logs) {
                    let embednperm = new Discord.MessageEmbed()
                        .setTitle("ERRORE<a:false:966789840475656202>")
                        .setDescription("Non hai settato niente di nuovo")
                        .setColor("RED")
                    let embedRest = new Discord.MessageEmbed()
                        .setColor(configColor.VERDE)
                        .setTitle("<:warn:965152728240254976>Resetta il database<:warn:965152728240254976>")
                        .setDescription("Non ha impostato nulla di nuovo")
                        .addField("Resetta<:information:965163341989437451>", "Clicca <a:right:965152774532771850> per resettare il database \rClicca <a:false:966789840475656202> per annullare \rClicca <:information:965163341989437451> per ottenere maggiori info")
                        .setFooter({ text: `Requested by ${interaction.user.tag} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    let buttonReset = new Discord.MessageButton()
                        .setLabel("Resetta Database")
                        .setStyle("SUCCESS")
                        .setCustomId("resetData")
                        .setEmoji("<a:right:965152774532771850>")

                    let buttonAnnulla = new Discord.MessageButton()
                        .setLabel("Annulla")
                        .setStyle("DANGER")
                        .setCustomId("annullaData")
                        .setEmoji("<a:false:966789840475656202>")

                    let row = new Discord.MessageActionRow()
                        .addComponents(buttonReset)
                        .addComponents(buttonAnnulla);
                    let buttonInfo = new Discord.MessageButton()
                        .setLabel("Info")
                        .setStyle("PRIMARY")
                        .setCustomId("dataInfo")
                        .setEmoji("<:information:965163341989437451>")
                    let row2 = new Discord.MessageActionRow()
                        .addComponents(buttonInfo)

                    interaction.reply({ embeds: [embednperm, embedRest], components: [row, row2] })
                    return
                }

                embedF.setColor(configColor.VERDE)
                embedF.setTitle("Bot settato<a:right:965152774532771850>")
                embedF.setFooter({ text: `Requested by ${interaction.user.tag} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                interaction.reply({ embeds: [embedF] })
            })
        } catch (err) {
            console.log(err)
            return
        }
    }
}