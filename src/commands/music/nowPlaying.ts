import { Command } from '../../structures/Command';
import { EmbedBuilder } from 'discord.js';
import { ProgressBar, Queue, Song } from 'discord-music-player';

export default new Command({
  name: 'nowplaying',
  description: 'Shows the song being played',
  run: async ({ client, interaction }) => {
    const queue: Queue = client.player.getQueue(interaction.guildId);

    if (!queue || queue.isPlaying === false)
      return interaction.followUp({
        content: `No music is playing right now.`,
        ephemeral: true,
      });

    const progressBar: ProgressBar = queue.createProgressBar({
      arrow: ':arrow_forward:',
      block: ':white_medium_square:',
    });

    var progressBarPrettier: string = progressBar.prettier;

    progressBarPrettier = progressBarPrettier.replace(/\s/g, ':black_medium_square:');

    const song: Song = queue.songs[0];

    const embed = new EmbedBuilder()
      .setTitle(':notes: Now Playing')
      .setColor('Red')
      .setDescription(
        `:musical_note: [${song.name}](${song.url}) - \`${song.duration}\` - Added by ${song.requestedBy}`
      )
      .setThumbnail(song.thumbnail)
      .addFields({
        name: '\u200b',
        value: progressBarPrettier,
      });

    interaction.followUp({
      embeds: [embed],
    });
  },
});
