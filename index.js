require('dotenv').config();

const fs = require('fs');
const path = require('path');

const {
    Client,
    GatewayIntentBits,
    Collection
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');

const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

    const commandsPath = path.join(foldersPath, folder);

    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {

        const filePath = path.join(commandsPath, file);

        const command = require(filePath);

        client.commands.set(command.data.name, command);
    }
}

const eventFiles = fs
    .readdirSync('./events')
    .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {

    const event = require(`./events/${file}`);

    client.on(event.name, (...args) =>
        event.execute(...args, client)
    );
}

client.login(process.env.TOKEN);
