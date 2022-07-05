import { Queue } from 'discord-music-player';
import { Command } from '../../structures/Command';

export default new Command({
  name: 'setvolume',
  description: 'Set the volume of the bot',
  options: [
    {
      name: 'value',
      description: 'The volume you want (default: 100)',
      type: 'NUMBER',
      required: true,
    },
  ],
  userPermissions: ['PRIORITY_SPEAKER'],
  run: async ({ interaction, client }) => {
    if (!interaction.member.voice.channel)
      return interaction.followUp({
        ephemeral: true,
        content: 'You need to be in a voice channel to perform this command.',
      });

    if (interaction.guild.me.voice.channel) {
      if (interaction.guild.me.voice.channelId != interaction.member.voice.channelId)
        return interaction.followUp({ ephemeral: true, content: `The bot is in an other voice channel.` });
    }

    const queue: Queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.isPlaying)
      return interaction.followUp({ ephemeral: true, content: `There is no music playing right now` });

    const input: number = interaction.options.getNumber('value', true);

    queue.setVolume(input);

    interaction.followUp({ content: `:loud_sound: Volume has been updated! Current value: \`${input}\`` });
  },
});
