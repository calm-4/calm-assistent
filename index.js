const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot läuft");
});

app.listen(3000, () => {
  console.log("Webserver läuft");
});

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`Eingeloggt als ${client.user.tag}`);
});

client.login(process.env.TOKEN);