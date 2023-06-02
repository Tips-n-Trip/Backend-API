const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.profile = async (req, res) => {
  try {
    const {id} = req.token;
    const {name, email, iteneraries} = await prisma.user.findUnique(
        {
          where: {
            id: id,
          }, include: {
            iteneraries: true,
          },
        },
    );
    const total_iteneraries = iteneraries.length;
    const user = {name, email, total_iteneraries};
    return res.status(200).json({
      'success': true,
      'message': 'data has found',
      user,
    });
  } catch (error) {
    console.error(error.message);
  }
};
