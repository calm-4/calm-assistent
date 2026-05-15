const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exchange')
        .setDescription('Währungen umrechnen')
        .addNumberOption(option =>
            option
                .setName('betrag')
                .setDescription('Betrag')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('von')
                .setDescription('Von')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('zu')
                .setDescription('Zu')
                .setRequired(true)
        ),

    async execute(interaction) {

        const betrag = interaction.options.getNumber('betrag');
        const von = interaction.options.getString('von').toUpperCase();
        const zu = interaction.options.getString('zu').toUpperCase();

        const res = await axios.get(
            `https://api.exchangerate.host/convert?from=${von}&to=${zu}&amount=${betrag}`
        );

        const result = res.data.result;

        const embed = new EmbedBuilder()
            .setColor('#FEE75C')
            .setTitle('💱 Currency Exchange')
            .setDescription(
                `💸 **${betrag} ${von}** = **${result.toFixed(2)} ${zu}**`
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
