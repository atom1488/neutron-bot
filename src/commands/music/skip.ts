import { Queue, Song } from 'discord-music-player';
import { Command } from '../../structures/Command';

export default new Command({
  name: 'skip',
  description: 'skips the playing song',
  run: async ({ interaction, client }) => {
    if (!interaction.member.voice.channel)
      return interaction.followUp({ content: 'You need to be in a voice channel.', ephemeral: true });

    if (interaction.guild.me.voice.channel) {
      if (interaction.guild.me.voice.channelId != interaction.member.voice.channelId)
        return interaction.followUp({ content: 'The bot is in an other voice channel', ephemeral: true });
    }

    const queue: Queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.isPlaying)
      return interaction.followUp({ content: `There's no music playing right now`, ephemeral: true });

    const songName: string = queue.songs[0].name;
    const success: Song = queue.skip();

    interaction.followUp({ content: success ? `**${songName}** has been skipped` : `:x: Error, can't skip` });
  },
});
