module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.guild.me.permissions.has("SEND_MESSAGE")) {
            interaction.deferReply()
            return
        }

        if (!interaction.isButton()) return

        if (interaction.customId == "resetData") {

            if (!interaction.guild.me.permissions.has("MANAGE_MESSAGE")) {
                var embednperm = new Discord.MessageEmbed()
                    .setTitle("NON HO IL PERMESSO<a:false:966789840475656202>")
                    .setDescription("Non ho il permesso di modificare i messaggi")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }

            let footer = interaction.message.embeds[1].footer.text
            let userId = interaction.message.embeds[1].footer.text.slice(-18, footer.length)

            if (interaction.user.id !== userId) {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi eseguire un bottone non tuo")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }

            let embedResetdata = new Discord.MessageEmbed()
                .setColor(configColor.VERDE)
                .setTitle("<:warn:965152728240254976>Resetta il database<:warn:965152728240254976>")
                .addField("Conferma<a:right:965152774532771850>", "Clicca conferma per resettare il database")
                .addField("Annulla<a:false:966789840475656202>", "Clicca annulla per annullare il reset del database")
                .setFooter({ text: `Requested by ${interaction.user.tag} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

            let buttonReset = new Discord.MessageButton()
                .setLabel("Conferma")
                .setStyle("SUCCESS")
                .setCustomId("confermaResetData")
                .setEmoji("<a:right:965152774532771850>")

            let buttonAnnulla = new Discord.MessageButton()
                .setLabel("Annulla")
                .setStyle("DANGER")
                .setCustomId("annullaData")
                .setEmoji("<a:false:966789840475656202>")

            let row = new Discord.MessageActionRow()
                .addComponents(buttonReset)
                .addComponents(buttonAnnulla);

            interaction.update({ embeds: [embedResetdata], components: [row] });
        }

        if (interaction.customId == "annullaData") {
            try {
                let footer = interaction.message.embeds[0].footer.text
            } catch {
                footer = interaction.message.embeds[1].footer.text
            }
            let userId = footer.slice(-18, footer.length)

            if (interaction.user.id !== userId) {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi eseguire un bottone non tuo")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }

            if (interaction.user.id !== userId) {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi eseguire un bottone non tuo")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }

            let buttonReset = new Discord.MessageButton()
                .setLabel("Conferma")
                .setStyle("SUCCESS")
                .setCustomId("confermaResetData")
                .setEmoji("<a:right:965152774532771850>")
                .setDisabled();

            let buttonAnnulla = new Discord.MessageButton()
                .setLabel("Annulla")
                .setStyle("DANGER")
                .setCustomId("annullaData")
                .setEmoji("<a:false:966789840475656202>")
                .setDisabled();

            let row = new Discord.MessageActionRow()
                .addComponents(buttonReset)
                .addComponents(buttonAnnulla);

            interaction.update({ embeds: [interaction.message.embeds[0]], components: [row] })

            let annullaData = await new Discord.MessageEmbed()
                .setColor(configColor.VERDE)
                .setTitle("Annulato il reset del database<a:right:965152774532771850>")
                .setDescription("Ha annullato il reset del database")
                .setFooter({ text: `Requested by ${interaction.user.tag} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            client.channels.cache.get(interaction.channel.id).send({ embeds: [annullaData] });
        }
        if (interaction.customId == "dataInfo") {

            try {
                let footer = interaction.message.embeds[0].footer.text
            } catch {
                footer = interaction.message.embeds[1].footer.text
            }
            let userId = footer.slice(-18, footer.length)

            if (interaction.user.id !== userId) {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi eseguire un bottone non tuo")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }

            if (!interaction.guild.me.permissions.has("MANAGE_MESSAGE")) {
                var embednperm = new Discord.MessageEmbed()
                    .setTitle("NON HO IL PERMESSO<a:false:966789840475656202>")
                    .setDescription("Non ho il permesso di modificare i messaggi")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }

            let embed = new Discord.MessageEmbed()
                .setColor(configColor.VERDE)
                .setTitle("Info<a:right:965152774532771850>")
                .setDescription("Se resetterai il database verranno eliminati i dati")
                .setFooter({ text: `Requested by ${interaction.user.tag} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (interaction.customId == "confermaResetData") {

            let foter = interaction.message.embeds[0].footer.text

            let userId = foter.slice(-18, foter.length)

            if (interaction.user.id !== userId) {
                let embednperm = new Discord.MessageEmbed()
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non puoi eseguire un bottone non tuo")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }

            if (!interaction.guild.me.permissions.has("MANAGE_MESSAGE")) {
                var embednperm = new Discord.MessageEmbed()
                    .setTitle("NON HO IL PERMESSO<a:false:966789840475656202>")
                    .setDescription("Non ho il permesso di modificare i messaggi")
                    .setColor("RED")
                interaction.reply({ embeds: [embednperm], ephemeral: true })
                return
            }

            let guild = client.guilds.cache.get(interaction.guild.id)

            let server = {
                serverName: guild.name,
                serverId: guild.id,
                logs: {
                    status: false,
                    channel: "",
                },
                ticket: {
                    status: false,
                    category: "",
                    channel: "",
                },
                welcome_leave: {
                    status: false,
                    channel: "",
                    desc: "",
                    title: ""
                },
                counting: {
                    status: false,
                    server: {
                        channel: "",
                        number: 0,
                        lastUtente: "Nessuno",
                        bestScore: 0,
                    },
                },
                blacklist: {
                    status: false,
                }
            }

            database.collection("lurix").updateOne({ serverId: serverID }, { $set: server })

            let embed = new Discord.MessageEmbed()
                .setColor(configColor.VERDE)
                .setTitle("Database resettato<a:right:965152774532771850>")
                .setDescription("I dati del database sono stati resettati")
                .setFooter({ text: `Requested by ${interaction.user.tag} ID: ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            interaction.update({ embeds: [embed], ephemeral: true })
        }
    }
}