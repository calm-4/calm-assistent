const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file =>
  file.endsWith('.js')
);

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  commands.push(command.data.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {

    console.log('🔄 Slash Commands werden geladen...');

    await rest.put(
      Routes.applicationCommands(1503533932904448171),
      { body: commands },
    );

    console.log('✅ Slash Commands geladen');

  } catch (error) {
    console.error(error);
  }
})();
