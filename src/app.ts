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
    saveUninitialized: false,
    resave: false,
    store: new RedisStore({
      client: redis,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    },
  })
);

app.use('/api', router);

export default app;
