import { Queue, RepeatMode } from 'discord-music-player';
import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../structures/Command';

export default new Command({
  name: 'loop',
  description: 'Loops a song',
  options: [
    {
      name: 'mode',
      description: '1 = DISABLED, 2 = SONG, 3 = QUEUE',
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
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

    const loopMode: number = interaction.options.getNumber('mode', true);

    if (loopMode == 1) {
      queue.setRepeatMode(RepeatMode.DISABLED);
      return interaction.followUp({ content: `Loop has been disabled.` });
    } else if (loopMode == 2) {
      queue.setRepeatMode(RepeatMode.SONG);
      return interaction.followUp({ content: `Song will now be looped.` });
    } else if (loopMode == 3) {
      queue.setRepeatMode(RepeatMode.QUEUE);
      return interaction.followUp({ content: `Loop has been set to QUEUE mode.` });
    } else {
      return interaction.followUp({ ephemeral: true, content: `Loop Mode must be 0, 1 or 2` });
    }
  },
});
