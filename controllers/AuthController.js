const {nanoid} = require('nanoid');
const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
require('dotenv').config();
const auth = require('../middleware/auth');

// Prisma Client Extension: method for User model
const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async attempt(email, password) {
        const user = await prisma.user.findFirst({where: {
          email: email,
        }});
        if (user) {
          const auth = bcrypt.compare(password, user.password);
          if (auth) {
            return user;
          }
          throw Error;
        }
        throw Error;
      },
    },
  },
});

module.exports.register = async (req, res) => {
  let {email, name, password} = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error;
    }
    await prisma.$connect();
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    const id = nanoid(16);
    const user = {
      id,
      email,
      name,
      password,
    };
    const newData = await prisma.user.create({
      data: user,
    });
    return res.status(200).json({
      'success': true,
      'message': 'User has been created',
    });
  } catch (error) {
    return res.status(400).json({
      'success': false,
      'message': 'Error. Unable to create user',
    });
  }
};

module.exports.login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await prisma.user.attempt(email, password);
    const token = auth.generateToken(user.id);
    res.cookie('jwt', token);
    return res.status(200).json({
      'success': true,
      'message': 'User has logged in',
      'data': {
        'id': user.id,
        'token': token,
      },
    });
  } catch (error) {
    return res.status(400).json({
      'success': false,
      'message': error.message,
    });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  return res.status(200).json({
    'success': true,
    'message': 'User has logged out',
  });
};
