import { verify } from 'argon2';
import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from '../utils/prisma';

const authenticate = async (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        try {
          const user = await prisma.user.findUnique({ where: { username } });
          if (!user) return done(null, false, { message: 'invalid username/password' });
          const passwordMatched = await verify(user.password, password);
          if (!passwordMatched) return done(null, false, { message: 'invalid username/password' });
          return done(null, user);
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user: any, done: any) => done(null, user.id));

  passport.deserializeUser(async (id: any, done: any) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (e) {
      done(e);
    }
  });
};

export default authenticate;
