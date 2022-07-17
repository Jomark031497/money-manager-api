import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import router from './routes';
import authenticate from './config/passport.config';
import prisma from './utils/prisma';
import { __prod__ } from './constants';

declare module 'express-session' {
  // eslint-disable-next-line no-unused-vars
  interface SessionData {
    passport: {
      user: string;
    };
  }
}

const app = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(
  session({
    name: 'qidfavreau',
    secret: <string>process.env.SECRET,
    saveUninitialized: true, // won't save if {} is empty
    resave: false, // wont save session if it's not modified?
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: __prod__, // cookie only works in https
      sameSite: 'none', // csrf
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
authenticate(passport);

app.use('/api', router);

export default app;
