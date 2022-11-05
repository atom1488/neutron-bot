import {
  ApplicationCommandOptionType,
  ButtonInteraction,
  CollectedInteraction,
  GuildMember,
  InteractionCollector,
  MessageActionRow,
  MessageButton,
} from 'discord.js';
import { Command } from '../../structures/Command';
import { ExtendedInteraction } from '../../typings/Command';
export default new Command({
  name: 'ban',
  description: 'Ban a user',
  userPermissions: ['BanMembers'],
  options: [
    {
      name: 'target',
      type: ApplicationCommandOptionType.User,
      description: 'User to ban',
      required: true,
    },
    {
      name: 'reason',
      type: ApplicationCommandOptionType.String,
      description: 'Reason for the ban',
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const memberAya: GuildMember = interaction.options.getMember('target') as GuildMember;
    const reason = interaction.options.get('reason', false) || 'No reason given';
    if (!interaction.guild.me.permissions.has('ADMINISTRATOR'))
      return interaction.followUp({ content: `I don't have \`ADMINISTRATOR\` permission.` });
    if (memberAya.roles.highest.rawPosition >= interaction.guild.me.roles.highest.rawPosition) {
      return interaction.followUp({ content: `The user you are trying to ban is superior to the bot` });
    }
    if (interaction.member.roles.highest.rawPosition <= memberAya.roles.highest.rawPosition) {
      return interaction.followUp({ content: `You can't ban someone with a role higher than yours.` });
    }
    const row: MessageActionRow = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('banYes').setLabel('Yes').setStyle('SUCCESS'),
      new MessageButton().setCustomId('banNo').setLabel('No').setStyle('DANGER')
    );
    const banInteraction: ExtendedInteraction = interaction;
    banInteraction.followUp({ content: `Are you sure you want to ban ${memberAya.user.tag}?`, components: [row] });
    setTimeout(() => {
      banInteraction.deleteReply().catch(() => {});
    }, 10000);
    const collector: InteractionCollector<CollectedInteraction> =
      banInteraction.channel.createMessageComponentCollector({ time: 10000 });
    collector.on('collect', async (button: ButtonInteraction) => {
      if (button.customId === 'banYes') {
        button.deferUpdate();
        if (button.user.id !== interaction.user.id) return;
        memberAya.ban({ reason }).catch(() => {});
        banInteraction.deleteReply().catch(() => {});
        banInteraction.followUp({
          content: `${memberAya.user.tag} has been banned by ${interaction.member.user.username}`,
        });
      }
      if (button.customId === 'banNo') {
        if (button.user.id !== interaction.user.id) return;
        banInteraction.deleteReply().catch(() => {});
      }
    });
  },
});
