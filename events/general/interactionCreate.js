const cooldowns = new Map();

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        try {

            if (interaction.bot) return
            if (!interaction.isCommand()) return

            let server = client.guilds.cache.get(interaction.guild.id);
            const utente = interaction.guild.members.cache.get(interaction.user.id);
            const command = client.commands.get(interaction.commandName)
            const permissions = command.permissions
            const permissionsBot = command.permissionsBot
            const { permissionsList } = require("../../config/perm.json")
            const { Permissions } = require("discord.js")
            if (!command) return

            if (!cooldowns.has(interaction.commandName)) {
                cooldowns.set(interaction.commandName, new Discord.Collection());
            }

            const current_time = Date.now();
            const time_stamps = cooldowns.get(interaction.commandName);
            const cooldown_amount = (command.cooldown) * 1000;

            if (time_stamps.has(interaction.user.id)) {
                const expiration_time = time_stamps.get(interaction.user.id) + cooldown_amount;

                if (current_time < expiration_time) {
                    const time_left = (expiration_time - current_time) / 1000;

                    let embedErr = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle("ERRORE<a:false:966789840475656202>")
                        .setDescription(`Aspetta: \`${time_left.toFixed(1)}\` secondi prima di usare il comando \`/${interaction.commandName}\``)
                    interaction.reply({ embeds: [embedErr], ephemeral: true });
                    return
                }
            }

            time_stamps.set(interaction.user.id, current_time);
            setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);

            if (!interaction.guild.me.permissions.has([Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.SEND_MESSAGES])) {
                console.log("Errore, il bot non ha il permesso di inviare messaggi")
                let embedNoPerm = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription("Non ho il permesso di mandare messaggi. Permesso: `SEND_MESSAGES` ")
                utente.send({ embeds: [embedNoPerm] }).catch(() => { })
                return
            }

            if (permissionsBot && !interaction.guild.me.permissions.has(permissionsBot)) {
                if (permissionsBot == [] || !permissionsBot) return
                let embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription(`C'è stato un errore nell'eseguzione del comando, il bot non ha i permessi necessari per eseguire il comando /${interaction.commandName}`)
                    .addField("Permessi", `Il bot richiede di questi permessi: \`${permissionsBot.join(" ")}\``)
                interaction.reply({ embeds: [embed] }).then(() => {
                    console.log(`Il bot richiede di questi permessi: ${permissionsBot.join(" ")}`);
                })
                return
            }

            if (permissions && !interaction.member.permissions.has(permissions)) {
                if (permissions == [] || !permissions) return
                permissions.forEach(() => {
                    interaction.member.permissions.has(permissions)
                })
                let embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("ERRORE<a:false:966789840475656202>")
                    .setDescription(`Non hai i permessi per esguire questo il comando /${interaction.commandName}`)
                    .addField("Permessi", `Devi avere questi permessi: \`${permissions.join(" ")}\``)
                interaction.reply({ embeds: [embed] })
                return
            }

            let embed = new Discord.MessageEmbed()
                .setColor(configColor.AZZURRO)
                .setAuthor({ name: interaction.user.username, iconURL: utente.user.displayAvatarURL({ dynamic: true }) })
                .setTitle("Comando eseguito")
                .addField("Time⏰", "```" + `${moment(new Date().getTime()).format("ddd DD MMM YYYY, HH:mm:ss")}` + "```", false)
                .addField("Server🪧", "```ID: " + interaction.guild.id + " | Name: " + server.name + "```")
                .addField("Command💻", "```Name: /" + interaction.commandName + "```")
                .addField("Autore🙎‍♂️", "```" + interaction.user.username + "```")
                .addField("User ID: ", "```" + interaction.user.id + "```")
                .setThumbnail(server.iconURL({ dynamic: true }))
            client.channels.cache.get(config.channels.logsCommands).send({ embeds: [embed] })

            command.execute(interaction)
        } catch (error) {
            console.log(error)
        }
    }
}