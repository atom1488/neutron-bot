import {
  ButtonInteraction,
  GuildMember,
  InteractionCollector,
  Message,
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
  User,
} from 'discord.js';
import { Command } from '../../structures/Command';
import { ExtendedInteraction } from '../../typings/Command';

export default new Command({
  name: 'mute',
  description: 'mute a user',
  userPermissions: ['MODERATE_MEMBERS'],
  options: [
    {
      name: 'target',
      type: 'USER',
      description: 'User to mute',
      required: true,
    },
    {
      name: 'time',
      type: 'NUMBER',
      description: 'Time in seconds',
      required: true,
    },
    {
      name: 'reason',
      type: 'STRING',
      description: 'Reason for the mute',
      required: false,
    },
  ],

  run: async ({ interaction }) => {
    const memberAya: GuildMember = interaction.options.getMember('target') as GuildMember;
    const time: number = interaction.options.getNumber('time') || 0;
    const reason: string = interaction.options.getString('reason') || 'No reason given';

    if (!interaction.guild.me.permissions.has('ADMINISTRATOR'))
      return interaction.followUp({ content: `Je n'ai pas la permission \`ADMINISTRATOR\` permission.` });

    if (interaction.member.roles.highest.rawPosition >= interaction.guild.me.roles.highest.rawPosition) {
      return interaction.followUp({ content: `The user you are trying to mute is superior to the bot` });
    }

    if (interaction.member.roles.highest.rawPosition <= memberAya.roles.highest.rawPosition) {
      return interaction.followUp({ content: `You can't mute someone with a role higher than yours.` });
    }
    const row: MessageActionRow = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('muteYes').setLabel('Yes').setStyle('SUCCESS'),

      new MessageButton().setCustomId('muteNo').setLabel('No').setStyle('DANGER')
    );

    const muteInteraction: ExtendedInteraction = interaction;
    muteInteraction.followUp({
      content: `:warning: Are you sure to mute ${memberAya.user.username}`,
      components: [row],
    });
    setTimeout(() => {
      muteInteraction.deleteReply().catch(() => {});
    }, 10000);
    const collector: InteractionCollector<MessageComponentInteraction> =
      muteInteraction.channel.createMessageComponentCollector({ time: 10000 });
    collector.on('collect', async (button: ButtonInteraction) => {
      if (button.customId === 'muteYes') {
        button.deferUpdate();
        if (button.user.id !== interaction.user.id) return;
        memberAya.timeout(time, reason);
        interaction.channel.send({
          content: `**<@${memberAya.id}>** was muted for ${time} seconds by **<@${interaction.member.id}>**`,
        });
        const buttonMessage: Message = button.message as Message;
        buttonMessage.delete().catch(() => {});
      }
      if (button.customId === 'muteNo') {
        button.deferUpdate();
        if (button.user.id !== interaction.user.id) return;
        const buttonMessage: Message = button.message as Message;
        buttonMessage.delete().catch(() => {});
      }
    });
  },
});
