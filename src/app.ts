import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import Redis from 'ioredis';
import router from './routes';

const app = express();

declare module 'express-session' {
  // eslint-disable-next-line no-unused-vars
  interface SessionData {
    userId: string;
  }
}

app.set('trust proxy', 1);

const RedisStore = connectRedis(session);
const redis = new Redis(<string>process.env.REDIS_URL);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(
  session({
    name: 'qid',
    secret: <string>process.env.SECRET,
    saveUninitialized: false, // won't save if {} is empty
    resave: false, // wont save session if it's not modified?
    store: new RedisStore({
      client: redis,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    },
  })
);

app.use('/api', router);

export default app;
