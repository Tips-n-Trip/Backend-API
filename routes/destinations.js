const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {getAllDestination} = require('../handlers/list');
const express = require('express');

const router = express.Router();

router.get('/', getAllDestination);

module.exports = router;
