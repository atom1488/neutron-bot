import { ActionRowBuilder, BaseGuildTextChannel, ButtonBuilder, ButtonInteraction, Message } from 'discord.js';
import { Command } from '../../structures/Command';

export default new Command({
  name: 'nuke',
  description: 'delete the channel and clone it',
  userPermissions: ['ManageChannels'],
  run: async ({ interaction }) => {
    if (!interaction.guild.members.me.permissions.has('Administrator'))
      return interaction.followUp({ content: `I don't have \`Administrator\` permission.` });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('nukeYes').setLabel('Yes').setStyle(3),

      new ButtonBuilder().setCustomId('nukeNo').setLabel('No').setStyle(4)
    );

    const nukeInteraction = interaction;

    nukeInteraction.followUp({ content: `:warning: Are you sure you want to nuke ?`, components: [row as any] });

    setTimeout(() => {
      nukeInteraction.deleteReply().catch(() => {});
    }, 10000);

    const collector = nukeInteraction.channel.createMessageComponentCollector({ time: 10000 });

    collector.on('collect', async (button: ButtonInteraction) => {
      if (button.customId === 'nukeYes') {
        button.deferUpdate();
        if (button.user.id !== interaction.user.id) return;
        const buttonChannel: BaseGuildTextChannel = button.channel as BaseGuildTextChannel;
        const position: number = buttonChannel.rawPosition;
        const channelName: string = buttonChannel.name;
        const newChannel: BaseGuildTextChannel = (await buttonChannel.clone().catch(() => {})) as BaseGuildTextChannel;
        buttonChannel.delete().catch(() => {});

        newChannel.setPosition(position);
        newChannel.send({ content: `\`${channelName}\` was nuked by **${interaction.user.username}**` });
      }

      if (button.customId === 'nukeNo') {
        button.deferUpdate();
        if (button.user.id !== interaction.user.id) return;
        const buttonMessage: Message = button.message as Message;
        buttonMessage.delete().catch(() => {});
      }
    });
  },
});
