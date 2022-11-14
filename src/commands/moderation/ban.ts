import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonInteraction,
  CollectedInteraction,
  EmbedBuilder,
  GuildMember,
  InteractionCollector,
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
    const reason = interaction.options.getString('reason', false) || 'No reason given';
    if (!interaction.guild.members.me.permissions.has('Administrator'))
      return interaction.followUp({ content: `I don't have \`Administrator\` permission.` });
    if (memberAya.roles.highest.rawPosition >= interaction.guild.members.me.roles.highest.rawPosition) {
      return interaction.followUp({ content: `The user you are trying to ban is superior to the bot` });
    }
    if (interaction.member.roles.highest.rawPosition <= memberAya.roles.highest.rawPosition) {
      return interaction.followUp({ content: `You can't ban someone with a role higher than yours.` });
    }
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('banYes').setLabel('Yes').setStyle(3),
      new ButtonBuilder().setCustomId('banNo').setLabel('No').setStyle(4)
    );
    const banInteraction: ExtendedInteraction = interaction;
    banInteraction.followUp({
      content: `Are you sure you want to ban ${memberAya.user.tag}?`,
      components: [row as any],
    });
    setTimeout(() => {
      banInteraction.deleteReply().catch(() => {});
    }, 10000);
    const collector = banInteraction.channel.createMessageComponentCollector({ time: 10000 });
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
