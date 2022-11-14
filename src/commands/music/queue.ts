import { ProgressBar, Queue, Song } from 'discord-music-player';
import { Embed, EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command';

export default new Command({
  name: 'queue',
  description: 'Shows the music queue',
  run: async ({ interaction, client }) => {
    if (!interaction.member.voice.channel)
      return interaction.followUp({
        ephemeral: true,
        content: 'You need to be in a voice channel to perform this command.',
      });

    if (interaction.guild.members.me.voice.channel) {
      if (interaction.guild.members.me.voice.channelId != interaction.member.voice.channelId)
        return interaction.followUp({ ephemeral: true, content: `The bot is in an other voice channel.` });
    }

    const queue: Queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.isPlaying)
      return interaction.followUp({ ephemeral: true, content: `There is no music playing right now` });

    const currentTrack: Song = queue.songs[0];
    const songs: string[] = queue.songs.slice(0, 10).map((m, i) => {
      return `${i + 1}. [${m.name}](${m.url})`;
    });

    const timeCodes: ProgressBar = queue.createProgressBar();

    const embed = new EmbedBuilder()
      .setTitle(`Queue`)
      .setDescription(
        `${songs.join('\n')}${
          queue.songs.length > songs.length
            ? `\n...${
                queue.songs.length - songs.length === 1
                  ? `${queue.songs.length - songs.length} more songs`
                  : `${queue.songs.length - songs.length} more songs`
              }`
            : ''
        }`
      )
      .setColor('DarkVividPink')
      .addFields({
        name: 'Now Playing',
        value: `🎶[${currentTrack.name}](${currentTrack.url}) \`${timeCodes.times}\``,
      });

    interaction.followUp({ embeds: [embed] });
  },
});
