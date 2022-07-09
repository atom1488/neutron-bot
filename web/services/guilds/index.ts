import axios from 'axios';
import { User } from '../../database/schemas/';
import { DISCORD_API_URL } from '../../utils/constants';
import { Guild, PartialGuild } from '../../utils/types';

export function getBotGuildsService() {
  const TOKEN = process.env.botToken;

  return axios
    .get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
      headers: { Authorization: `Bot ${TOKEN}` },
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Cannot fetch bot guilds');
    });
}

export async function getUserGuildsService(id: string) {
  const user = await User.findById(id);
  if (!user) throw new Error('No user found');
  return axios
    .get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Cannot fetch user guilds');
    });
}

export async function getMutualGuildsService(id: string) {
  const { data: botGuilds } = await getBotGuildsService();
  const { data: userGuilds } = await getUserGuildsService(id);

  const adminUserGuilds = userGuilds.filter(({ permissions }) => (parseInt(permissions) & 0x8) === 0x8);

  return adminUserGuilds.filter((guild) => botGuilds.some((botGuild) => botGuild.id === guild.id));
}

export function getGuildService(id: string) {
  const TOKEN = process.env.botToken;
  return axios.get<Guild>(`${DISCORD_API_URL}/guilds/${id}`, {
    headers: {
      Authorization: `Bot ${TOKEN}`,
    },
  });
}
