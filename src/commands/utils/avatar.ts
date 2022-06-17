import { Command } from '../../structures/Command';
import { MessageEmbed, User } from 'discord.js'
import {SlashCommandBuilder} from '@discordjs/builders';

export default new Command({
    name: 'avatar',
    description: 'display user\'s avatar',
    options: [{
        name: 'target',
        type: 'USER',
        description: 'User to display',
        required: false,
    }],
    run: async({ interaction }) => {
        const user: User = interaction.options.getUser('target') || interaction.user;
        
        const profilePicture: string = user.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' });

        const avatarEmbed: MessageEmbed = new MessageEmbed()
            .setDescription(`:bust_in_silhouette: [Avatar of **${user.username}**](${profilePicture})`)
            .setColor('#ee6f71')
            .setImage(profilePicture);

        interaction.followUp({ embeds: [avatarEmbed] });
    }
});
