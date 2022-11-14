import { ApplicationCommandOptionType, Attachment, AttachmentBuilder } from 'discord.js';
import { Command } from '../../structures/Command';

export default new Command({
  name: 'achievement',
  description: 'Make a minecraft achievement',
  options: [
    {
      name: 'text',
      description: 'Text on the Achievement (max 24 char)',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    if (!interaction.guild.members.me.permissions.has('AttachFiles'))
      return interaction.followUp({ content: `I don't have \`AttachFiles\` permission.`, ephemeral: true });

    const achievementIcon: number = Math.floor(Math.random() * 28);

    const string: string = interaction.options.getString('text', true);

    var query: string | string[] = string.split(' ');

    query = query.join('+');

    if (query.length > 24) return interaction.followUp({ ephemeral: true, content: `Text is too long (max: 24 char)` });

    query = query.replace('%', '%25');
    query = query.replace('?', '%3f');

    const achievementImage: string =
      'https://minecraftskinstealer.com/achievement/' + achievementIcon + '/Achievement unlocked!/' + query;

    var imageAttachment = new AttachmentBuilder(achievementImage, { name: 'minecraft.png' });

    interaction.followUp({
      files: [imageAttachment],
    });
  },
});
