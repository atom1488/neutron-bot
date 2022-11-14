import { Command } from '../../structures/Command';
import { ApplicationCommandOptionType, EmbedBuilder, User } from 'discord.js';

export default new Command({
  name: 'avatar',
  description: "display user's avatar",
  options: [
    {
      name: 'target',
      type: ApplicationCommandOptionType.User,
      description: 'User to display',
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const user: User = interaction.options.getUser('target') || interaction.user;

    const profilePicture: string = user.displayAvatarURL({ forceStatic: false, size: 2048, extension: 'png' });

    const avatarEmbed = new EmbedBuilder()
      .setDescription(`:bust_in_silhouette: [Avatar of **${user.username}**](${profilePicture})`)
      .setColor('#ee6f71')
      .setImage(profilePicture);

    interaction.followUp({ embeds: [avatarEmbed] });
  },
});
