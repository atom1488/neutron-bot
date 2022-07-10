import { Command } from '../../structures/Command';
import Jikan from 'jikan-node';
import { MessageEmbed } from 'discord.js';

type animeQuery = {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  synopsis: string;
  type: string;
  episodes: number;
  score: number;
  start_date: string;
  end_date: string;
  members: number;
  rated: string;
};

export default new Command({
  name: 'anime',
  description: 'Give informations on a anime',
  options: [
    {
      name: 'anime_name',
      type: 'STRING',
      description: 'The name of the anime',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const JIKAN: any = new Jikan();

    const query = interaction.options.getString('anime_name');
    if (query.length < 3)
      return interaction.followUp({ content: 'Anime name need to be at least 3 characters', ephemeral: true });

    const info = await JIKAN.search('anime', query);
    const animeQuery: animeQuery = info.results[0];

    if (animeQuery.start_date != null) {
      animeQuery.start_date = animeQuery.start_date.replace('T00:00:00+00:00', '')
    }
    if (animeQuery.end_date != null) {
      animeQuery.end_date = animeQuery.end_date.replace('T00:00:00+00:00', '')
    }

    const embed = new MessageEmbed()
      .setTitle(`**${animeQuery.title}** (ID: ${animeQuery.mal_id || '?'})`)
      .setThumbnail(`${animeQuery.image_url || interaction.member.avatarURL}`)
      .addFields(
        {
          name: 'Link',
          value: `[MyAnimeList](${animeQuery.url || ''})`,
          inline: true,
        },
        {
          name: 'Type',
          value: `${animeQuery.type || 'None'}`,
          inline: true,
        },
        {
          name: 'Number of Episodes',
          value: `${animeQuery.episodes || '?'}`,
          inline: true,
        },
        {
          name: 'Score',
          value: `${animeQuery.score || 'Unknown'}/10`,
          inline: true,
        },
        {
          name: 'Start Date',
          value: `${animeQuery.start_date.replace('T00:00:00+00:00', '') || '?'}`,
          inline: true,
        },
        {
          name: 'End Date',
          value: `${animeQuery.end_date.replace('T00:00:00+00:00', '') || '?'}`,
          inline: true,
        },
        {
          name: 'Synopsis',
          value: `${animeQuery.synopsis || 'None'}`,
          inline: true,
        }
      );

    interaction.followUp({ embeds: [embed] });
  },
});
