import { config } from 'dotenv';
config();
import express, { Express } from 'express';
import routes from '../routes/index';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
require('../strategies/discord');
import store from 'connect-mongo';

export function createApp(): Express {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Enable cors
  app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

  // Enable session (cookies etc)
  app.use(
    session({
      secret: 'joinCallOfTheVoid',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 604800000,
      },
      store: store.create({
        mongoUrl: process.env.mongoDbURI as string,
      }),
    })
  );

  // Enable Passport

  app.use(passport.initialize());
  app.use(passport.session());

  app.use((_req, _res, next) => setTimeout(() => next(), 900));

  app.use('/api', routes);
  return app;
}
