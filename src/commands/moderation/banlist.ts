import { EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command';

export default new Command({
  name: 'banlist',
  description: 'Show all the banned users',
  userPermissions: ['BanMembers'],
  run: async ({ interaction }) => {
    const fetchedBans = await interaction.guild.bans.fetch();

    var banList = fetchedBans.map((bannedMember) => bannedMember.user.tag).join('\n');

    if (!banList) return interaction.followUp({ content: 'There are no banned users' });

    if (banList.length >= 1950) banList = `${banList.slice(0, 1948)}...`;

    const embed = new EmbedBuilder()
      .setTitle(`${fetchedBans.size} users are banned.`)
      .setDescription(`\`${banList}\``)
      .setColor('DarkRed')
      .setThumbnail(interaction.guild.iconURL({ forceStatic: false, size: 2048, extension: 'png' }));

    interaction.followUp({ embeds: [embed] });
  },
});
