//COMANDI
client.commands = new Discord.Collection();
const commandsFolder = fs.readdirSync(`${process.cwd()}/commands`);
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`${process.cwd()}/commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`${process.cwd()}/commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

//EVENTI
const eventsFolders = fs.readdirSync(`${process.cwd()}/events`);
for (const folder of eventsFolders) {
    const eventsFiles = fs.readdirSync(`${process.cwd()}/events/${folder}`)

    for (const file of eventsFiles) {
        (file.endsWith(".js"))
        const event = require(`${process.cwd()}/events/${folder}/${file}`);
        client.on(event.name, (...args) => event.execute(...args));
    }
}