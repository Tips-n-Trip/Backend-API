const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async (req, res) => {
  await prisma.$connect();
  try {
    let souvenirs = [];
    const item = 5;
    const size = req.query.size;
    const page = req.query.page;
    if (size) {
      souvenirs = await prisma.souvenir.findMany(
          {
            take: Number(size),
          },
      );
      if (page) {
        souvenirs = await prisma.souvenir.findMany(
            {
              take: Number(size),
              skip: Number(size)*Number(page),
            },
        );
      }
    } else {
      souvenirs = await prisma.souvenir.findMany({take: Number(item)});
    }
    return res.status(200).json({
      'success': true,
      'message': 'found',
      souvenirs,
    });
  } catch (error) {
    res.status(500).json({
      'success': false,
      'message': error.message,
    });
  }
  await prisma.$disconnect();
};

module.exports.detail = async (req, res) => {
  try {
    const souvenirId = req.params.id;
    const souvenir = await prisma.souvenir.findUnique(
        {
          where: {
            id: souvenirId,
          },
          include: {
            destination: {
              select: {
                name,
              },
            },
          },
        },
    );
    if (!souvenir) {
      throw Error('Request not found');
    }
    return res.status(200).json({
      'success': true,
      'message': 'Data ditemukan',
      souvenir,
    });
  } catch (error) {
    return res.status(404).json({
      'success': false,
      'message': error.message,
    });
  }
};
