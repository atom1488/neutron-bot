import { Command } from '../../structures/Command';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';

export default new Command({
  name: 'dice',
  description: 'Generate a random number between 0 and a specefic value (default max value: 100)',
  options: [
    {
      name: 'value',
      type: ApplicationCommandOptionType.Number,
      description: 'The maximum value the dice can have',
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const value: number = interaction.options.getNumber('value') || 100;

    const randomNumber: number = Math.floor(Math.random() * value);

    const diceEmbed = new EmbedBuilder()
      .setColor('#ee6f71')
      .setTitle('Dice')
      .setDescription(`:game_die: **${randomNumber}**`);

    interaction.followUp({ embeds: [diceEmbed] });
  },
});
