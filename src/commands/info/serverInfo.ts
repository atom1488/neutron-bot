import { Command } from '../../structures/Command';
import { MessageEmbed } from 'discord.js';
import moment, { Moment } from 'moment';
import { client } from '../..';

export default new Command({
  name: 'serverinfo',
  description: 'Replies with server information.',
  run: async ({ interaction }) => {
    try {
      const TimeUnix: number = Math.round(interaction.guild.createdTimestamp / 1000);
      const TimeFull: Moment = moment(interaction.guild.createdAt);

      const ServerInfo: MessageEmbed = new MessageEmbed()
        .setColor('#ee6f71')
        .setTitle(`💾 ${interaction.guild.name}`)
        .addFields(
          {
            name: 'Owner',
            value: `<@${interaction.guild.ownerId}>`,
            inline: true,
          },
          { name: 'ID', value: `${interaction.guild.id}`, inline: true },
          { name: '\u200b', value: '\u200b', inline: true },
          {
            name: 'Total Members',
            value: `${interaction.guild.memberCount}`,
            inline: true,
          },
          {
            name: 'Boosts',
            value: `${interaction.guild.premiumSubscriptionCount}`,
            inline: true,
          },
          { name: '\u200b', value: '\u200b', inline: true },
          {
            name: 'Roles',
            value: `${interaction.guild.roles.cache.size - 1}`,
            inline: true,
          },
          {
            name: 'Channels',
            value: `${interaction.guild.channels.cache.size}`,
            inline: true,
          },
          { name: '\u200b', value: '\u200b', inline: true },
          {
            name: 'Created at',
            value: `${TimeFull.format('dddd, MMMM Do YYYY, h:mm:ss a')} (<t:${TimeUnix}:R>) `,
          }
        );

      if (interaction.guild.iconURL() != null) {
        ServerInfo.setThumbnail(
          `${interaction.guild.iconURL({ dynamic: true, size: 1024 })}` || `${client.user.displayAvatarURL()}`
        );
      }

      interaction.followUp({ embeds: [ServerInfo] });
    } catch (error) {
      console.log(error);
    }
  },
});
