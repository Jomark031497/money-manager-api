import { User } from '@prisma/client';
import { verify } from 'argon2';
import { PassportStatic } from 'passport';
import passportLocal from 'passport-local';
import logger from '../utils/logger';
import prisma from '../utils/prisma';

const LocalStrategy = passportLocal.Strategy;

const authenticate = async (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
          logger.error({ error: 'user not found' });
          return done(null, false);
        }

        const verified = await verify(user.password, password);
        if (!verified) {
          logger.error({ error: 'invalid password' });
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        logger.error(error);
        return done(error);
      }
    })
  );

  passport.serializeUser((user: Partial<User>, done) => done(null, user.id));

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await prisma.user.findUniqueOrThrow({ where: { id } });
      done(null, user);
    } catch (error) {
      logger.error(error, 'deserialize error');
      done(error);
    }
  });
};

export default authenticate;
