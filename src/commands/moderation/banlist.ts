import { MessageEmbed } from 'discord.js';
import { Command } from '../../structures/Command';

export default new Command({
  name: 'banlist',
  description: 'Show all the banned users',
  userPermissions: ['BAN_MEMBERS'],
  run: async ({ interaction }) => {
    const fetchedBans = await interaction.guild.bans.fetch();

    var banList = fetchedBans.map((bannedMember) => bannedMember.user.tag).join('\n');

    if (!banList) return interaction.followUp({ content: 'There are no banned users' });

    if (banList.length >= 1950) banList = `${banList.slice(0, 1948)}...`;

    const embed = new MessageEmbed()
      .setTitle(`${fetchedBans.size} users are banned.`)
      .setDescription(`\`${banList}\``)
      .setColor('DARK_RED')
      .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 2048, format: 'png' }));

    interaction.followUp({ embeds: [embed] });
  },
});
