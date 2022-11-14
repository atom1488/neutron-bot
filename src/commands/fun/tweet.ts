import { Command } from '../../structures/Command';
import { ApplicationCommandOptionType } from 'discord.js';
import axios, { AxiosResponse } from 'axios';

export default new Command({
  name: 'tweet',
  description: 'Replies with a tweet image',
  options: [
    {
      name: 'text',
      type: ApplicationCommandOptionType.String,
      description: 'Text on the tweet',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    if (!interaction.guild.members.me.permissions.has('AttachFiles'))
      return interaction.followUp({ content: "I don't have the `AttachFiles` permission." });

    const user = interaction.user;

    const input_text = interaction.options.getString('text', true);

    const res = await axios
      .get(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user.username}&text=${input_text}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch((e) => interaction.followUp({ content: e.message }));

    interaction.followUp({
      files: [
        {
          attachment: (res as AxiosResponse<any, any>).data.message,
          name: 'tweet.png',
        },
      ],
    });
  },
});
