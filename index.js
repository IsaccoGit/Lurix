require('events').EventEmitter.prototype._maxListeners = 100;
require("dotenv").config();
global.Discord = require("discord.js");
global.client = new Discord.Client({
    intents: 32767,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
global.config = require("./config/configId.json");
global.date = new Date;
global.ms = require("ms");
global.fetch = require("node-fetch");
global.moment = require("moment");
global.configColor = require("./config/color.json");
global.MongoClient = require("mongodb").MongoClient;
global.fs = require("fs");
client.login(process.env.TOKEN).then(() => { 
    require(`./handlers`)
})