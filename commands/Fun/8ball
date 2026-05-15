const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Stelle der 8Ball eine Frage')
        .addStringOption(option =>
            option
                .setName('frage')
                .setDescription('Deine Frage')
                .setRequired(true)
        ),

    async execute(interaction) {

        const frage = interaction.options.getString('frage');

        const antworten = [
            'Ja 👍',
            'Nein 👎',
            'Vielleicht 🤔',
            'Definitiv 🔥',
            'Eher nicht 😅',
            'Sehr wahrscheinlich 😎'
        ];

        const antwort =
            antworten[Math.floor(Math.random() * antworten.length)];

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🎱 8Ball')
            .addFields(
                { name: '❓ Frage', value: frage },
                { name: '💬 Antwort', value: antwort }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
