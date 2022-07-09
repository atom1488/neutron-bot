declare global {
  namespace NodeJS {
    interface ProcessEnv {
      botToken: string;
      guildId: string;
      environment: 'dev' | 'prod' | 'debug';
      PORT: number;
      clientId: string;
      clientSecret: string;
      discordRedirectURL: string;
      mongoDbURI: string;
    }
  }
}

export {};
