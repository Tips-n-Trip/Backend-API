const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async (req, res) => {
  await prisma.$connect();
  try {
    const attractions = await prisma.attraction.findMany();
    return res.status(200).json({
      'success': true,
      'message': 'found',
      'data': attractions,
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
      'data': {
        attraction,
      },
    });
  } catch (error) {
    return res.status(404).json({
      'success': false,
      'message': error.message,
    });
  }
};
