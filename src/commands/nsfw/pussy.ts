import { TextChannel, EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command';
import axios from 'axios';
export default new Command({
  name: 'pussy',
  description: 'Shows pussy pictures',
  run: async ({ interaction }) => {
    const currentChannel = interaction.channel as TextChannel;
    if (currentChannel.nsfw) {
      axios
        .get(`https://nekobot.xyz/api/image?type=pussy`)
        .then((res) => {
          const embed = new EmbedBuilder().setTitle('pussy').setImage(res.data.message).setColor('Random');
          interaction.followUp({ embeds: [embed] });
        })
        .catch((err) => {
          interaction.followUp({ content: 'An error has occured' });
          console.log(err);
        });
    } else {
      return interaction.followUp({ ephemeral: true, content: `This channel is not marked as NSFW.` });
    }
  },
});
