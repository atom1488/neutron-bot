import {Profile, Strategy} from 'passport-discord';
import passport from 'passport';
import {VerifyCallback} from 'passport-oauth2';

passport.use(new Strategy({
    clientID: process.env.clientID as string,
    clientSecret: process.env.clientSecret as string,
    callbackURL: process.env.callbackURL,
    scope: ['identify', 'email', 'guilds'],
}, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    console.log(accessToken, refreshToken);
    console.log(profile);
}));
