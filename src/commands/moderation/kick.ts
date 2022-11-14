import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonInteraction,
  GuildMember,
  InteractionCollector,
  MessageComponentInteraction,
} from 'discord.js';
import { Command } from '../../structures/Command';
import { ExtendedInteraction } from '../../typings/Command';
export default new Command({
  name: 'kick',
  description: 'kick a user',
  userPermissions: ['KickMembers'],
  options: [
    {
      name: 'target',
      type: ApplicationCommandOptionType.User,
      description: 'User to kick',
      required: true,
    },
    {
      name: 'reason',
      type: ApplicationCommandOptionType.String,
      description: 'Reason for the kick',
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const memberAya: GuildMember = interaction.options.getMember('target') as GuildMember;
    const reason: string = interaction.options.getString('reason') || 'No reason given';
    if (!interaction.guild.members.me.permissions.has('Administrator'))
      return interaction.followUp({ content: `I don't have \`Administrator\` permission.` });

    if (memberAya.roles.highest.rawPosition >= interaction.guild.members.me.roles.highest.rawPosition) {
      return interaction.followUp({ content: `The user you are trying to kick is superior to the bot` });
    }
    if (interaction.member.roles.highest.rawPosition <= memberAya.roles.highest.rawPosition) {
      return interaction.followUp({ content: `You can't kick someone with a role higher than yours.` });
    }
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('kickYes').setLabel('Yes').setStyle(3),
      new ButtonBuilder().setCustomId('kickNo').setLabel('No').setStyle(4)
    );

    const kickInteraction: ExtendedInteraction = interaction;
    kickInteraction.followUp({
      content: `Are you sure you want to kick ${memberAya.user.tag}?`,
      components: [row as any],
    });
    setTimeout(() => {
      kickInteraction.deleteReply().catch(() => {});
    }, 10000);
    const collector = kickInteraction.channel.createMessageComponentCollector({ time: 10000 });
    collector.on('collect', async (button: ButtonInteraction) => {
      if (button.customId === 'kickYes') {
        button.deferUpdate();
        if (button.user.id !== interaction.user.id) return;
        memberAya.kick(reason).catch(() => {});
        kickInteraction.deleteReply().catch(() => {});
        kickInteraction.followUp({
          content: `${memberAya.user.tag} has been kicked by ${interaction.member.user.username}`,
        });
      }
      if (button.customId === 'kickNo') {
        if (button.user.id !== interaction.user.id) return;
        kickInteraction.deleteReply().catch(() => {});
      }
    });
  },
});
