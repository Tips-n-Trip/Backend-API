require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {PrismaClient} = require('@prisma/client');
const passport = require('passport');
const prisma = new PrismaClient();

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, callback) => {
    const newUser = {
      id: profile.id,
      email: profile.email,
      name: profile.name,
    };
    try {
      let user = await prisma.user.findUnique({
        where: {
          email: {email: profile.email},
        },
      });
      if (user) {
        callback(null, user);
      } else {
        user = await prisma.user.create({
          data: newUser,
        });
        callback(null, user);
      }
    } catch (error) {
      console.error();
    }
  },
  ),
  );

  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser((user, callback) => {
    const data = prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    callback(error, data);
  });
};
