const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async (req, res) => {
  await prisma.$connect();
  try {
    const destinations = await prisma.destination.findMany();
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
        'data': {
          destinations,
        },
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
      'data': {
        destination,
      },
    });
  } catch (error) {
    return res.status(404).json({
      'success': false,
      'message': error,
    });
  }
};
