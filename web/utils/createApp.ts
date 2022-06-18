import { config } from 'dotenv';
config();
import express, { Express } from 'express';
import routes from '../routes/index'
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
require('../strategies/discord');

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
                maxAge: (60000 * 60 * 24 * 7),
            },
        })
    );
    
    // Enable Passport

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', routes);
    return app;
}

