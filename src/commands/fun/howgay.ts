import { Command } from '../../structures/Command';
import { ApplicationCommandOptionType } from 'discord.js';

export default new Command({
  name: 'howgay',
  description: 'Replies with gay %.',
  options: [
    {
      name: 'target',
      type: ApplicationCommandOptionType.User,
      description: 'Target user',
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const user = interaction.options.getUser('target') || interaction.user;
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    interaction.followUp({ content: `${user.username} is gay at ${randomNumber}% 🏳️‍🌈` });
  },
});
