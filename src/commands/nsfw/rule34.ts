import { Command } from '../../structures/Command';
import axios from 'axios';
import { MessageEmbed, TextChannel } from 'discord.js';

export default new Command({
  name: 'rule34',
  description: 'Shows rule34 pictures, need to precise the tag',
  options: [
    {
      name: 'tag',
      description: 'The tag to search',
      required: true,
      type: 'STRING',
    },
  ],
  run: async ({ interaction }) => {
    var tag: string = interaction.options.getString('tag');
    if (!(interaction.channel as TextChannel).nsfw)
      return interaction.followUp({ content: `This channel is not marked as NSFW.` });
    axios
      .get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1000&tags=${tag}&json=1`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        tag = tag.replace(/\s/g, '+');
        if (res.data === undefined || !res.data) {
          return interaction.followUp({ content: 'Nothing found' });
        }
        const objectSize = Object.keys(res.data).length;
        const random = Math.floor(Math.random() * (objectSize - 1));
        const file_url: string = res.data[random].file_url;
        const embed = new MessageEmbed()
          .setDescription(`[rule34 : **${tag.replace('+', ' ')}**](${file_url})`)
          .setImage(file_url)
          .setColor('RANDOM');
        interaction.followUp({ embeds: [embed] });
      })
      .catch((err) => {
        interaction.followUp({ content: 'An error has occured' });
        console.log(err);
      });
  },
});
