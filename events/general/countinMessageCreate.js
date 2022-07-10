module.exports = {
    name: "messageCreate",
    permissions: [],
    permissionsBot: [],
    async execute(message) {
        if(!message.guild) return
        let serverID = message.guild.id
        if (message.author.bot) return

        try {
            var numero = Parser.evaluate(message.content);
        } catch { return }

        database.collection("lurix").find({ serverId: serverID }).toArray(async function (err, result) {
            let lurix = result.find(x => x.serverId == serverID);
            if (message.channel.id !== lurix.counting.server.channel) return

            let numDb = lurix.counting.server.number;
            let countingDb = lurix.counting.server;

            if (message.member.user.username == countingDb.lastUtente) {
                message.react("🔴");
                database.collection("lurix").updateOne({ serverId: serverID }, {
                    $set: {
                        counting: {
                            status: true,
                            server: {
                                channel: message.channel.id,
                                number: 0,
                                lastUtente: "Nessun utente",
                                bestScore: lurix.counting.server.bestScore
                            },
                        }
                    }
                })

                var titleRandom = ["MA SAPETE COME SI GIOCA?", "MA È COSÌ DIFFICILE QUESTO GIOCO?", "NOOOO, PERCHÈ..."]

                var embedErr = new Discord.MessageEmbed()
                    .setColor("#EB3140")
                    .setTitle(titleRandom[Math.floor(Math.random() * titleRandom.length)])
                    .setDescription("Ogni utente può scrivere un solo numero alla volta")

                message.channel.send({ embeds: [embedErr] })
                await message.channel.send("0")
                    .then(msg => {
                        msg.react("🟢")
                    })
                return
            } else if (numero != numDb + 1) {
                var titleRandom = [`MA SIETE SICURI DI SAPER CONTARE?`, `SAD FOR YOU`, `MA SIETE SCEMI?`, "QUANTO HAI IN MATEMATICA?", "QUALCUNO QUI NON SA CONTARE", "SIETE DELLE CAPRE", "IMMAGINO AVRETE 5 IN MATEMATICA, GIUSTO?", `MA SIETE SCEMI?`, "QUALCUNO QUI NON SA CONTARE", "SIETE DELLE CAPRE", `SAD FOR YOU`, "RIUSCIAMO A COMINCIARE ALMENO?", "DAI... ALMENO ARRIVIAMO A 10", "NON SO SE LO SAI MA IL PRIMO NUMERO È 1", `SAD FOR YOU`, `MA SIETE SCEMI?`, "QUANTO HAI IN MATEMATICA?", "QUALCUNO QUI NON SA CONTARE", "PROPRIO ORA DOVEVATE SBAGLIARE?", "DAIII, STAVAMO FACENDO IL RECORD", message.member.user.username + " HAI ROVINATO I SOGNI DI TUTTI"]
                var embed = new Discord.MessageEmbed()
                    .setTitle(titleRandom[Math.floor(Math.random() * titleRandom.length)])
                    .setColor("#EB3140")
                    .setDescription("Numero errato, dovevi inserire `" + (numDb + 1) + "`")

                message.channel.send({ embeds: [embed] })

                database.collection("lurix").updateOne({ serverId: serverID }, {
                    $set: {
                        counting: {
                            status: true,
                            server: {
                                channel: message.channel.id,
                                number: 0,
                                lastUtente: "Nessun utente",
                                bestScore: lurix.counting.server.bestScore
                            },
                        }
                    }
                })
                message.channel.send("0")
                    .then(msg => {
                        msg.react("🟢")
                    })
                message.react("🔴");
                return
            } else {
                if (numero > lurix.counting.server.bestScore) {
                    database.collection("lurix").updateOne({ serverId: serverID }, {
                        $set: {
                            counting: {
                                status: true,
                                server: {
                                    channel: message.channel.id,
                                    number: numero,
                                    lastUtente: message.member.user.username,
                                    bestScore: numero
                                },
                            }
                        }
                    })
                    message.react("🔵")
                } else {
                    database.collection("lurix").updateOne({ serverId: serverID }, {
                        $set: {
                            counting: {
                                status: true,
                                server: {
                                    channel: message.channel.id,
                                    number: lurix.counting.server.number + 1,
                                    lastUtente: message.member.user.username,
                                    bestScore: lurix.counting.server.bestScore
                                },
                            }
                        }
                    })
                    message.react("🟢")
                }
            }
        })
    }
}