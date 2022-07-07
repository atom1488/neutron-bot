import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { validateCookies } from './helpers';
import { Guild } from './types';

const API_URL = 'http://localhost:3001/api';

export const fecthMutualGuilds = async (context: GetServerSidePropsContext) => {
  const headers = validateCookies(context);

  if (!headers) return { redirect: { destination: '/' } };

  try {
    const { data: guilds } = await axios.get<Guild[]>(`${API_URL}/guilds`, { headers });
    return { props: { guilds } };
  } catch (err) {
    console.error(err);
    return { redirect: { destination: '/' } };
  }
};

export const fetchValidGuild = async (id: string, headers: HeadersInit) => {
  return await fetch(`${API_URL}/guilds/${id}/permissions`, {
    headers,
  });
};
