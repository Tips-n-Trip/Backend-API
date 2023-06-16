const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async (req, res) => {
  await prisma.$connect();
  try {
    let destinations = [];
    const item = 5;
    const size = req.query.size;
    const page = req.query.page;
    if (size) {
      destinations = await prisma.destination.findMany(
          {
            take: Number(size),
          },
      );
      if (page) {
        destinations = await prisma.destination.findMany(
            {
              take: Number(size),
              skip: Number(size)*Number(page),
            },
        );
      }
    } else {
      destinations = await prisma.destination.findMany({take: Number(item)});
    }
    if (destinations.length < 1) {
      res.status(200).json({
        'success': true,
        'message': 'Data belum tersedia',
        'data': null,
      });
    } else {
      res.status(200).json({
        'success': true,
        'message': 'Data tersedia',
        destinations,
      });
    }
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
    const destinationId = req.params.id;
    console.log(destinationId);
    const destination = await prisma.destination.findUnique(
        {
          where: {
            id: destinationId,
          },
          include: {
            souvenirs: true,
            attractions: true,
          },
        },
    );
    if (!destination) {
      throw new Error('Destinasi tidak ditemukan');
    }
    return res.status(200).json({
      'success': true,
      'message': 'Data ditemukan',
      destination,
      'total_objek': destination.attractions.length,
      'total_sentra': destination.souvenirs.length,
    });
  } catch (error) {
    return res.status(404).json({
      'success': false,
      'message': 'Request not found',
    });
  }
};
