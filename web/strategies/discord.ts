import { Profile, Strategy } from "passport-discord";
import passport from "passport";
import { VerifyCallback } from "passport-oauth2";
import { User } from "../database/schemas/index";

passport.serializeUser((user: any, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.error(err);
        return done(err, null);
    }
});

passport.use(
    new Strategy(
        {
            clientID: process.env.clientID as string,
            clientSecret: process.env.clientSecret as string,
            callbackURL: process.env.callbackURL,
            scope: ["identify", "email", "guilds"]
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            const { id: discordId } = profile;

            try {
                const existingUser = await User.findOneAndUpdate(
                    { discordId },
                    { accessToken, refreshToken },
                    { new: true }
                );

                if (existingUser) return done(null, existingUser);
                const newUser = new User({ discordId, accessToken, refreshToken });

                const savedUser = await newUser.save();
                return done(null, savedUser);
            } catch (err) {
                console.error(err);
                return done(err, undefined);
            }
        }
    )
);
