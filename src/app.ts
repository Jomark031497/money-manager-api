import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';

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
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use('/api', router);

export default app;
