const {check, ExpressValidator} = require('express-validator');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {body} = new ExpressValidator({
  isRegistered: async (value) => {
    const user = await prisma.user.findUnique({
      where: {email: value},
    });
    if (user) {
      throw new Error('Email telah terdaftar');
    }
  },
}, {
  notRegistered: async (value) => {
    const user = await prisma.user.findUnique({
      where: {email: value},
    });
    if (!user) {
      throw new Error('Email belum terdaftar');
    }
  }});

module.exports.store = [
  check('email').
      trim().
      isString().
      isEmail().
      bail().
      notEmpty().
      bail(),
  body('email').
      isRegistered(),
  check('name').
      trim().
      isString().
      notEmpty().
      bail().
      isLength({max: 255}),
  check('password').
      trim().
      notEmpty().
      isLength({min: 8}),
];

module.exports.authenticate = [
  check('email').
      trim().
      isString().
      isEmail().
      bail().
      notEmpty().
      bail(),
  body('email').
      notRegistered(),
  check('password').
      trim().
      notEmpty().
      isLength({min: 8}),
];

module.exports.validate = [
  check('duration').
      trim().
      isInt().
      bail().
      notEmpty().
      bail(),
  check('budget').
      trim().
      notEmpty().
      bail().
      isInt().
      bail(),
];
