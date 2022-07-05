import { PlayerEvents } from 'discord-music-player'
import { ClientEvents } from 'discord.js'

//export class Event<Key extends keyof ClientEvents> {

export interface ExtendedEvents extends ClientEvents, PlayerEvents {
  error: any
}

export class Event<Key extends keyof ExtendedEvents> {
  constructor(public event: Key, public run: (...args: ExtendedEvents[Key]) => any) {}
}
