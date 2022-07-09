import { GetServerSidePropsContext } from 'next';
import { FullGuild } from './types';

export const validateCookies = (ctx: GetServerSidePropsContext) => {
  const sessionID = ctx.req.cookies['connect.sid'];
  return sessionID
    ? {
        Cookie: `connect.sid=${sessionID}`,
      }
    : false;
};

export const getIcon = (guild?: FullGuild) =>
  !guild || !guild.icon ? '/botavatar.png' : `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
