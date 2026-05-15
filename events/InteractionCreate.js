const {
    ChannelType,
    PermissionsBitField,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {

        if (interaction.isChatInputCommand()) {

            const command =
                client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
            }
        }

        if (interaction.isButton()) {

            if (interaction.customId === 'ticket') {

                const channel =
                    await interaction.guild.channels.create({

                        name:
                            `ticket-${interaction.user.username}`,

                        type: ChannelType.GuildText,

                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,

                                deny: [
                                    PermissionsBitField.Flags.ViewChannel
                                ]
                            },

                            {
                                id: interaction.user.id,

                                allow: [
                                    PermissionsBitField.Flags.ViewChannel,
                                    PermissionsBitField.Flags.SendMessages
                                ]
                            }
                        ]
                    });

                const embed = new EmbedBuilder()
                    .setColor('#5865F2')
                    .setTitle('🎫 Ticket erstellt')
                    .setDescription(
                        `Hallo ${interaction.user}, bitte beschreibe dein Problem.`
                    );

                channel.send({
                    embeds: [embed]
                });

                interaction.reply({
                    content: `✅ Ticket erstellt: ${channel}`,
                    ephemeral: true
                });
            }
        }
    }
};
