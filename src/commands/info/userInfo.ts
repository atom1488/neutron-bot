import { Command } from '../../structures/Command';
import { ApplicationCommandOptionType, GuildMember, EmbedBuilder } from 'discord.js';
import moment, { Moment } from 'moment';
export default new Command({
  name: 'userinfo',
  description: 'Replies user information.',
  options: [
    {
      name: 'target',
      type: ApplicationCommandOptionType.User,
      description: 'Show user information',
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const member: GuildMember =
      (interaction.options.getMember('target') as GuildMember) || (interaction.member as GuildMember);
    const TimeFull: Moment = moment(member.user.createdAt);
    const TimeFullAt: Moment = moment(member.joinedAt);
    const profilePicture: string = member.user.displayAvatarURL({
      forceStatic: false,
      size: 2048,
      extension: 'png',
    });
    const UserEmbed = new EmbedBuilder()
      .setAuthor({
        name: member.user.username,
        iconURL: member.user.displayAvatarURL({
          forceStatic: false,
          size: 2048,
          extension: 'png',
        }),
      })
      .setColor('#ee6f71')
      .setThumbnail(profilePicture)
      .addFields(
        {
          name: 'Name',
          value: `<@${member.user.id}>`,
          inline: true,
        },
        {
          name: 'ID',
          value: `${member.user.id}`,
          inline: true,
        },
        { name: '\u200b', value: '\u200b', inline: true },
        {
          name: 'Created at',
          value: `${TimeFull.format('dddd, MMMM Do YYYY, h:mm:ss a')} (<t:${Math.round(
            member.user.createdTimestamp / 1000
          )}:R>)`,
          inline: false,
        },
        {
          name: 'Joined at',
          value: `${TimeFullAt.format('dddd, MMMM Do YYYY, h:mm:ss a')} (<t:${Math.round(
            member.joinedTimestamp / 1000
          )}:R>)`,
          inline: false,
        }
      );
    interaction.followUp({ embeds: [UserEmbed] });
  },
});
