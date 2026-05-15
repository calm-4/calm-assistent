const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Würfle eine Zahl'),

    async execute(interaction) {

        const zahl = Math.floor(Math.random() * 6) + 1;

        const embed = new EmbedBuilder()
            .setColor('#57F287')
            .setTitle('🎲 Würfel')
            .setDescription(`Du hast **${zahl}** gewürfelt!`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
