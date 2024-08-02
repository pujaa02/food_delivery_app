/* eslint-disable @typescript-eslint/no-explicit-any */
import { Strategy } from 'passport-jwt';
import { Request } from 'express';;
import dotenv from "dotenv";
import { JWT_SECRET } from '../config';
import { findUser } from '../modules/user/repository/user.repository';
dotenv.config();

const getToken = (req: Request) => {
    // console.log(req.headers.authorization);
    return req.cookies.token;
}
const options: { jwtFromRequest: ReturnType<typeof getToken>, secretOrKey: string } = { jwtFromRequest: getToken, secretOrKey: `${JWT_SECRET}` };

type DoneCallback = (err: any, user?: Express.User | false | null) => void;
const auth: DoneCallback = (passport) => {
    passport.use(new Strategy(options, async (jwt_payload, done) => {
        try {
            const user = await findUser(jwt_payload.user_id);
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false), jwt_payload;
            }
        }
        catch (error) {
            return done(error);
        }
    }));
};

export { auth, getToken };


