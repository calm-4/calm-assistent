const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot läuft!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Webserver läuft");
});
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Eingeloggt als ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

client.login(process.env.TOKEN);
