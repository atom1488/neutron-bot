import { Command } from '../../structures/Command';
import { User } from 'discord.js';
import axios from 'axios';

export default new Command({
  name: 'tweet',
  description: 'Replies with a tweet image',
  options: [
    {
      name: 'text',
      type: 'STRING',
      description: 'Text on the tweet',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    if (!interaction.guild.me.permissions.has('ATTACH_FILES'))
      return interaction.followUp({ content: "I don't have the `ATTACH_FILES` permission." });

    const user: User = interaction.user;

    const input_text = interaction.options.getString('text', true);
    axios
      .get(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user.username}&text=${input_text}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        interaction.followUp({
          files: [
            {
              attachment: res.data.message,
              name: 'tweet.png',
            },
          ],
        });
      })
      .catch((err) => {
        console.error(err);
        return interaction.followUp({ content: 'An Error has occured.' });
      });
  },
});
