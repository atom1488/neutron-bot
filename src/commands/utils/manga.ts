import { Command } from '../../structures/Command';
import Jikan from 'jikan-node';
import { MessageEmbed } from 'discord.js';

type mangaQuery = {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  publishing: boolean;
  synopsis: string;
  type: string;
  chapters: number;
  volumes: number;
  score: number;
  start_date: string;
  end_date: string;
  members: number;
};

export default new Command({
  name: 'manga',
  description: 'Give informations on a manga',
  options: [
    {
      name: 'manga_name',
      type: 'STRING',
      description: 'The name of the manga',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const JIKAN: any = new Jikan();

    const query = interaction.options.getString('manga_name');
    if (query.length < 3)
      return interaction.followUp({ content: 'Anime name need to be at least 3 characters', ephemeral: true });

    const info = await JIKAN.search('manga', query);
    const mangaQuery: mangaQuery = info.results[0];

    if (mangaQuery.start_date != null) {
      mangaQuery.start_date = mangaQuery.start_date.replace('T00:00:00+00:00', '');
    }
    if (mangaQuery.end_date != null) {
      mangaQuery.end_date = mangaQuery.end_date.replace('T00:00:00+00:00', '');
    }

    const embed = new MessageEmbed()
      .setTitle(`**${mangaQuery.title}** (ID: ${mangaQuery.mal_id || '?'})`)
      .setThumbnail(`${mangaQuery.image_url || interaction.member.avatarURL}`)
      .addFields(
        {
          name: 'Link',
          value: `[MyAnimeList](${mangaQuery.url || ''})`,
          inline: true,
        },
        {
          name: 'Type',
          value: `${mangaQuery.type || 'None'}`,
          inline: true,
        },
        {
          name: 'Number of Volumes',
          value: `${mangaQuery.volumes || '?'}`,
          inline: true,
        },
        {
          name: 'Score',
          value: `${mangaQuery.score || 'Unknown'}/10`,
          inline: true,
        },
        {
          name: 'Start Date',
          value: `${mangaQuery.start_date || '?'}`,
          inline: true,
        },
        {
          name: 'End Date',
          value: `${mangaQuery.end_date || '?'}`,
          inline: true,
        },
        {
          name: 'Synopsis',
          value: `${mangaQuery.synopsis || 'None'}`,
          inline: true,
        }
      );

    interaction.followUp({ embeds: [embed] });
  },
});
