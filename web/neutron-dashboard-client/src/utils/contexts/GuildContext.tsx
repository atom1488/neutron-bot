import { createContext } from 'react';
import { FullGuild } from '../types';

type GuildContextType = {
  guild?: FullGuild;
  setGuild: (guild: FullGuild) => void;
};

export const GuildContext = createContext<GuildContextType>({
  setGuild: () => {},
});
