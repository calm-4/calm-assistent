const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot läuft!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Webserver läuft");
});

const {
  Client,
  GatewayIntentBits,
  PermissionsBitField
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const prefix = "!";

client.once("ready", () => {
  console.log(`Eingeloggt als ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // PING
  if (command === "ping") {
    return message.reply("🏓 Pong!");
  }

  // SERVER INFO
  if (command === "serverinfo") {
    return message.reply(
      `Server: ${message.guild.name}\nMitglieder: ${message.guild.memberCount}`
    );
  }

  // USER INFO
  if (command === "userinfo") {
    const user =
      message.mentions.users.first() || message.author;

    return message.reply(
      `👤 Username: ${user.username}\n🆔 ID: ${user.id}`
    );
  }

  // AVATAR
  if (command === "avatar") {
    const user =
      message.mentions.users.first() || message.author;

    return message.reply(user.displayAvatarURL({ dynamic: true }));
  }

  // BOT INFO
  if (command === "botinfo") {
    return message.reply(
      `🤖 Botname: ${client.user.username}`
    );
  }

  // 8BALL
  if (command === "8ball") {
    const responses = [
      "Ja",
      "Nein",
      "Vielleicht",
      "Natürlich",
      "Keine Chance",
      "Frag später nochmal"
    ];

    const random =
      responses[Math.floor(Math.random() * responses.length)];

    return message.reply(`🎱 ${random}`);
  }

  // COINFLIP
  if (command === "coinflip") {
    const result =
      Math.random() < 0.5 ? "Kopf" : "Zahl";

    return message.reply(`🪙 ${result}`);
  }

  // ROLL
  if (command === "roll") {
    const max = parseInt(args[0]) || 100;

    const number =
      Math.floor(Math.random() * max) + 1;

    return message.reply(`🎲 ${number}`);
  }

  // CALC
  if (command === "calc") {
    try {
      const calculation = args.join(" ");
      const result = eval(calculation);

      return message.reply(`📠 Ergebnis: ${result}`);
    } catch {
      return message.reply("❌ Fehlerhafte Rechnung");
    }
  }

  // CLEAR
  if (command === "clear") {
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      )
    ) {
      return message.reply("❌ Keine Rechte");
    }

    const amount = parseInt(args[0]);

    if (!amount || amount < 1 || amount > 100) {
      return message.reply("❌ Zahl zwischen 1-100");
    }

    await message.channel.bulkDelete(amount, true);

    return message.channel.send(
      `🧹 ${amount} Nachrichten gelöscht`
    );
  }

  // KICK
  if (command === "kick") {
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.KickMembers
      )
    ) {
      return message.reply("❌ Keine Rechte");
    }

    const member = message.mentions.members.first();

    if (!member) {
      return message.reply("❌ User erwähnen");
    }

    const reason =
      args.slice(1).join(" ") || "Kein Grund";

    await member.kick(reason);

    return message.reply(
      `👢 ${member.user.tag} wurde gekickt`
    );
  }

  // BAN
  if (command === "ban") {
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.BanMembers
      )
    ) {
      return message.reply("❌ Keine Rechte");
    }

    const member = message.mentions.members.first();

    if (!member) {
      return message.reply("❌ User erwähnen");
    }

    const reason =
      args.slice(1).join(" ") || "Kein Grund";

    await member.ban({ reason });

    return message.reply(
      `🔨 ${member.user.tag} wurde gebannt`
    );
  }

  // TIMEOUT
  if (command === "timeout") {
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    ) {
      return message.reply("❌ Keine Rechte");
    }

    const member = message.mentions.members.first();

    if (!member) {
      return message.reply("❌ User erwähnen");
    }

    const minutes = parseInt(args[1]);

    if (!minutes) {
      return message.reply("❌ Dauer angeben");
    }

    await member.timeout(minutes * 60 * 1000);

    return message.reply(
      `⏳ ${member.user.tag} wurde getimeoutet`
    );
  }

  // UNTIMEOUT
  if (command === "untimeout") {
    const member = message.mentions.members.first();

    if (!member) {
      return message.reply("❌ User erwähnen");
    }

    await member.timeout(null);

    return message.reply(
      `✅ Timeout entfernt`
    );
  }

  // LOCK
  if (command === "lock") {
    await message.channel.permissionOverwrites.edit(
      message.guild.roles.everyone,
      {
        SendMessages: false
      }
    );

    return message.reply("🔒 Channel gelockt");
  }

  // UNLOCK
  if (command === "unlock") {
    await message.channel.permissionOverwrites.edit(
      message.guild.roles.everyone,
      {
        SendMessages: true
      }
    );

    return message.reply("🔓 Channel entsperrt");
  }
});

client.login(process.env.TOKEN);
// TICKET SYSTEM

let ticketCategory = null;

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // SET CATEGORY
  if (command === "ticket" && args[0] === "setcategory") {

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply("❌ Keine Rechte");
    }

    const categoryId = args[1];

    if (!categoryId) {
      return message.reply("❌ Kategorie ID angeben");
    }

    ticketCategory = categoryId;

    return message.reply(`✅ Ticket Kategorie gesetzt:\n${categoryId}`);
  }

  // CREATE TICKET
  if (command === "ticket" && args[0] === "setup") {

    const existing = message.guild.channels.cache.find(
      c => c.name === `ticket-${message.author.username.toLowerCase()}`
    );

    if (existing) {
      return message.reply("❌ Du hast bereits ein Ticket");
    }

    const channel = await message.guild.channels.create({
      name: `ticket-${message.author.username}`,
      type: 0,
      parent: ticketCategory || null,
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ["ViewChannel"]
        },
        {
          id: message.author.id,
          allow: ["ViewChannel", "SendMessages"]
        }
      ]
    });

    channel.send(
      `🎫 Willkommen ${message.author}\nSupport wird dir bald helfen.`
    );

    return message.reply(`✅ Ticket erstellt: ${channel}`);
  }

  // CLOSE TICKET
  if (command === "ticket" && args[0] === "close") {

    if (!message.channel.name.startsWith("ticket-")) {
      return message.reply("❌ Kein Ticket Channel");
    }

    await message.reply("🗑️ Ticket wird geschlossen...");

    setTimeout(() => {
      message.channel.delete();
    }, 3000);
  }

  // ADD USER
  if (command === "ticket" && args[0] === "add") {

    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ User erwähnen");
    }

    await message.channel.permissionOverwrites.edit(user.id, {
      ViewChannel: true,
      SendMessages: true
    });

    return message.reply(`✅ ${user.tag} hinzugefügt`);
  }

  // REMOVE USER
  if (command === "ticket" && args[0] === "remove") {

    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ User erwähnen");
    }

    await message.channel.permissionOverwrites.delete(user.id);

    return message.reply(`✅ ${user.tag} entfernt`);
  }
});
