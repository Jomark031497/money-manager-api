import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';
import { User as PrismaUser } from '@prisma/client';
import prisma from './utils/prisma';
import logger from './utils/logger';
import userRoutes from './routes/user.routes';
import authenticate from './configs/passport.config';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface User extends PrismaUser {}
  }
}

const main = async () => {
  const app = express();

  const port = process.env.PORT || 8080;

  app.use(express.json());
  app.use(
    session({
      name: 'qid',
      secret: <string>process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  authenticate(passport);

  app.use('/api/users', userRoutes);

  app.listen(port, () => {
    logger.info(`app started at http://localhost:${port}`);
  });
};

main()
  .catch((error) => {
    logger.error(error);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
