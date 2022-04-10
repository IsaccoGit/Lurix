require('events').EventEmitter.prototype._maxListeners = 100;
require("dotenv").config()
global.Discord = require("discord.js");
global.client = new Discord.Client({
    intents: 32767,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
global.configId = require("./config/configId.json");
global.date = new Date
global.ms = require("ms");
global.moment = require("moment");
global.configColor = require("./config/color.json")

global.MongoClient = require("mongodb").MongoClient;
client.login(process.env.TOKEN)
const fs = require("fs");
client.commands = new Discord.Collection();

//COMANDI
const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

//EVENTI
const eventsFolders = fs.readdirSync('./events');
for (const folder of eventsFolders) {
    const eventsFiles = fs.readdirSync(`./events/${folder}`)

    for (const file of eventsFiles) {
        (file.endsWith(".js"))
        const event = require(`./events/${folder}/${file}`);
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//FUNZIONI
const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
for (const file of functionFiles) {
    require(`./functions/${file}`);
}
