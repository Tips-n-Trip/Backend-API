const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async (req, res) => {
  await prisma.$connect();
  try {
    let attractions = [];
    let souvenirs = [];
    const item = 5;
    const size = req.query.size;
    const page = req.query.page;
    if (size) {
      attractions = await prisma.attraction.findMany(
          {
            take: Number(size),
            include: {
              destination: true,
            },
          },
      );
      if (page) {
        attractions = await prisma.attraction.findMany(
            {
              take: Number(size),
              skip: Number(size)*Number(page),
            },
        );
      }
    } else {
      attractions = await prisma.attraction.findMany({take: Number(item)});
    }
    return res.status(200).json({
      'success': true,
      'message': 'found',
      attractions,
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
    const attractionId = req.params.id;
    const attraction = await prisma.attraction.findUnique(
        {
          where: {
            id: attractionId,
          },
        },
    );
    if (!attraction) {
      throw Error('Request not found');
    }
    return res.status(200).json({
      'success': true,
      'message': 'Data ditemukan',
      attraction,
    });
  } catch (error) {
    return res.status(404).json({
      'success': false,
      'message': error.message,
    });
  }
};
