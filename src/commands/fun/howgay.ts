import { Command } from '../../structures/Command'
import { User } from 'discord.js'

export default new Command({
  name: 'howgay',
  description: 'Replies with gay %.',
  options: [
    {
      name: 'target',
      type: 'USER',
      description: 'Target user',
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const user: User = interaction.options.getUser('target') || interaction.user
    var randomNumber: number = Math.floor(Math.random() * 100) + 1
    interaction.followUp({ content: `${user.username} is gay at ${randomNumber}% 🏳️‍🌈` })
  },
})
