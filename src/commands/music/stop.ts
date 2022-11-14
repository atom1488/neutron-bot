import { Queue } from 'discord-music-player';
import { Command } from '../../structures/Command';

export default new Command({
  name: 'stop',
  description: 'Stops the bot from playing music',
  run: async ({ interaction, client }) => {
    if (!interaction.member.voice.channel)
      return interaction.followUp({
        ephemeral: true,
        content: `You need to be in a voice channel to perform this command.`,
      });

    if (interaction.guild.members.me.voice.channel) {
      if (interaction.guild.members.me.voice.channelId != interaction.member.voice.channelId)
        return interaction.followUp({ ephemeral: true, content: `The bot is in an other voice channel.` });
    }

    const queue: Queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.isPlaying)
      return interaction.followUp({ ephemeral: true, content: `There is no music playing right now` });

    queue.stop();

    interaction.followUp({ content: `🔴 The music has been stopped.` });
  },
});
