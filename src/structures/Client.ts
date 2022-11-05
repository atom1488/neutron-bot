import { ApplicationCommandDataResolvable, Client, Collection, GatewayIntentBits, IntentsBitField, Partials } from 'discord.js';
import { CommandType } from '../typings/Command';
import glob from 'glob';
import { promisify } from 'util';
import { RegisterCommandsOptions } from '../typings/client';
import { Event } from './Event';
import { Player } from 'discord-music-player';
import { ExtendedEvents } from './Event';

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();
  player: Player = new Player(this, {
    deafenOnJoin: true,
    leaveOnStop: false,
  });

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
      ],
      partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
    });
  }

  start() {
    this.registerModules();
    this.login(process.env.botToken);
  }

  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(`\nRegistering commands to ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      console.log('\nRegistering global commands');
    }
  }

  async registerModules() {
    // Commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise((__dirname + '\\..\\commands\\**\\*.{ts,js}').replace(/\\/g, '/'));
    commandFiles.forEach(async (filePath) => {
      const command: CommandType = await this.importFile(filePath).catch((e) => {
        console.log(`❌ Error: ${e}`);
      });
      if (!command.name) return;
      console.log(`☑️  ${command.name} loaded.`);

      this.commands.set(command.name.toLowerCase(), command);
      slashCommands.push(command);
    });

    this.on('ready', () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.guildId,
      });
    });

    // Events
    const eventFiles = await globPromise((__dirname + '\\..\\events\\*.{ts,js}').replace(/\\/g, '/'));
    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ExtendedEvents> = await this.importFile(filePath);
      this.on(event.event as string, event.run);
    });
  }
}
