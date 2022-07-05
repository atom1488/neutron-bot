import { Queue } from 'discord-music-player'
import { Command } from '../../structures/Command'

export default new Command({
  name: 'seek',
  description: 'Seeks the current playing Song',
  options: [
    {
      name: 'value',
      description: 'time (in seconds)',
      type: 'NUMBER',
      required: true,
    },
  ],
  run: async ({ interaction, client }) => {
    if (!interaction.member.voice.channel)
      return interaction.followUp({
        ephemeral: true,
        content: 'You need to be in a voice channel to perform this command.',
      })

    if (interaction.guild.me.voice.channel) {
      if (interaction.guild.me.voice.channelId != interaction.member.voice.channelId)
        return interaction.followUp({ ephemeral: true, content: `The bot is in an other voice channel.` })
    }

    const queue: Queue = client.player.getQueue(interaction.guildId)

    if (!queue || !queue.isPlaying)
      return interaction.followUp({ ephemeral: true, content: `There is no music playing right now` })

    const value: number = interaction.options.getNumber('value')

    if (queue.nowPlaying.milliseconds <= value * 1000) {
      return interaction.followUp({ content: `This value exceeds the song time` })
    }

    queue.seek(value * 1000)

    interaction.followUp({ content: `Song time has been changed! \`${value} seconds\`` })
  },
})
