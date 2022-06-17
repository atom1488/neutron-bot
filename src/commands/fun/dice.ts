import { Command } from '../../structures/Command';
import { MessageEmbed } from 'discord.js'

export default new Command({
    name: 'dice',
    description: 'Generate Number beetwen 1 and 100',
    run: async({ interaction }) => {
        const randomNumber: number = Math.floor(Math.random() * 100) + 1;
        const diceEmbed: MessageEmbed = new MessageEmbed()
            .setColor('#ee6f71')
            .setTitle('Dice')
            .setDescription(`:game_die: **${randomNumber}**`);
        interaction.followUp({ embeds: [diceEmbed] });

    }
});
