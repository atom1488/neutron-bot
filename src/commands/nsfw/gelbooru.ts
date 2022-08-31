import { TextChannel, MessageEmbed } from 'discord.js';
import got from 'got';
import { Command } from '../../structures/Command';

export default new Command({
  name: 'gelbooru',
  description: 'Shows gelbooru pictures, need to precise the tag',
  options: [
    {
      name: 'tag',
      description: 'The tag to search',
      required: true,
      type: 'STRING',
    },
  ],
  run: async ({ interaction, client }) => {
    const currentChannel = interaction.channel as TextChannel;

    if (!currentChannel.nsfw)
      return interaction.followUp({ ephemeral: true, content: `This channel is not marked as NSFW.` });

    var tag: string = interaction.options.getString('tag');
    tag = tag.replace(/\s/g, '+');

    var bannedWords = [/(loli)/gi, /(shota)/gi];

    var res: any = await got
      .get(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=${tag}&limit=1000&json=1`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .json();

    try {
      var post = res.post;
      if (!post) return interaction.followUp({ content: 'Sorry, nothing found.' });
      const objectSize = Object.keys(post).length;
      if (objectSize == 0) return interaction.followUp({ content: 'Nothing found' });

      const random = Math.floor(Math.random() * (objectSize - 1));
      const fileUrl: string = post[random].file_url;

      for (let i = 0; i < bannedWords.length; i++) {
        if (bannedWords[i].test(post[random].tags))
          return interaction.followUp({ content: 'Sorry, some of the tags are not allowed' });
      }

      const embed = new MessageEmbed()
        .setTitle(`Gelbooru : **${tag.replace(/(\+)/g, ' ')}**`)
        .setImage(fileUrl)
        .setColor('RANDOM');
      interaction.followUp({ embeds: [embed] });
    } catch (err) {
      interaction.followUp({ content: 'An error has occured' });
      console.log(err);
    }
  },
});
