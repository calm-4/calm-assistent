const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Ticket Panel'),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🎫 Support Tickets')
            .setDescription(
                'Klicke unten um ein Ticket zu erstellen.'
            );

        const button = new ButtonBuilder()
            .setCustomId('ticket')
            .setLabel('🎫 Ticket erstellen')
            .setStyle(ButtonStyle.Primary);

        const row =
            new ActionRowBuilder()
                .addComponents(button);

        interaction.reply({
            embeds: [embed],
            components: [row]
        });
    }
};
