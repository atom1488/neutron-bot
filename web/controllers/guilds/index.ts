import { Request, Response } from 'express';
import { User } from '../../database/schemas/User';
import { getMutualGuildsService } from '../../services/guilds';

export async function getGuildsController(req: Request, res: Response) {
  const user = req.user as User;
  try {
    const guilds = await getMutualGuildsService(user.id);
    res.send(guilds);
  } catch (err) {
    console.error(err);
    res.sendStatus(400).send('Error');
  }
}
