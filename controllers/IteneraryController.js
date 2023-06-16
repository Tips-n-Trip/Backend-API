const axios = require('axios');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();


module.exports.generate = async (req, res) => {
  try {
    const {id} = req.token;
    let {destination, duration, budget} = req.body;
    destination = String(destination);
    duration = Number(duration);
    budget = Number(budget);
    const response = await axios.post('https://mlmodel-dot-capstone-project-1945.uc.r.appspot.com/generate',
        {
          destination, duration, budget,
        });
    const attractionNameList = response.data.attractions;
    const dest = await prisma.destination.findFirst({
      where: {
        name: destination,
      },
    });
    const getAttractionList = async (array) => {
      const attractionList = [];
      for (let i = 0; i < array.length; i++) {
        const attraction = await prisma.attraction.findFirst({where: {
          name: array[i].place_name,
        }});
        attractionList.push(attraction);
      }
      return attractionList;
    };

    const setItinerary = async () => {
      const newItenerary = await prisma.itenerary.create({
        data: {
          name: String(duration).concat(' hari di ' + destination),
          duration: Number(duration),
          destination: {
            connect: {id: dest.id},
          },
          isSaved: false,
          user: {
            connect: {id: id},
          },
        },
        include: {
          agendas: true,
        },
      });
      return newItenerary;
    };

    const setAgenda = async (array, itinerary) => {
      const ids = array.map((item) => item.id);
      let day = 1;
      let start = 0;
      for (let i = 0; i < array.length; i++) {
        if (i%3===0) {
          let agenda = await prisma.agenda.create({
            data: {
              day: day,
              itenerary: {
                connect: {id: itinerary.id},
              },
            },
          });
          for (let j = 0; j < 3; j++) {
            agenda = await prisma.agenda.update({
              where: {id: agenda.id},
              data: {
                attractions: {
                  create: [{
                    attraction: {
                      connect: {id: ids.slice(start, day*3)[j]},
                    },
                  }],
                },
              },
            });
          }
          start += 3;
          day += 1;
        }
      };
      return itinerary;
    };
    const attractionList = await getAttractionList(attractionNameList);
    const newItinerary = await setItinerary();
    const result = await setAgenda(attractionList, newItinerary);

    const itenerary = await prisma.itenerary.findUnique({
      where: {id: result.id},
      include: {
        agendas: {
          include: {
            attractions: {
              include: {
                attraction: true,
              },
            },
          },
        },
        destination: true,
      },
    });
    return res.status(200).json({
      'success': true,
      'message': 'Itinerary generated',
      itenerary,
    });
  } catch (error) {
    return res.status(500).json({
      'success': false,
      'message': 'Internal Server error',
    });
  };
};

module.exports.list = async (req, res) => {
  try {
    const {id} = req.token;
    const iteneraries = await prisma.itenerary.findMany(
        {
          where:
        {
          AND: {
            userId: id,
            isSaved: true,
          },
        },
          include: {
            agendas: {
              include: {
                attractions: {
                  include: {
                    attraction: true,
                  },
                },
              },
            },
            destination: true,
          }},
    );
    return res.status(200).json({
      'success': true,
      'message': 'success',
      iteneraries,
    });
  } catch (error) {
    return res.status(500).json({
      'success': false,
      'message': 'Internal Server error',
    });
  }
};

module.exports.save = async (req, res) => {
  try {
    const {id} = req.token;
    const itineraryId = req.params.id;
    const itenerary = await prisma.itenerary.update({
      where: {
        id: itineraryId,
      },
      data: {
        isSaved: true,
      },
    });
    return res.status(200).json({
      'success': true,
      'message': 'Success updated data',
    });
  } catch (error) {
    return res.status(500).json({
      'success': false,
      'message': 'Internal Server error',
    });
  }
};

module.exports.unsave = async (req, res) => {
  try {
    const {id} = req.token;
    const itineraryId = req.params.id;
    const itenerary = await prisma.itenerary.update({
      where: {
        id: itineraryId,
      },
      data: {
        isSaved: false,
      },
    });
    return res.status(200).json({
      'success': true,
      'message': 'Success updated data',
    });
  } catch (error) {
    return res.status(500).json({
      'success': false,
      'message': 'Internal Server error',
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const itineraryId = req.params.id;
    const agendas = await prisma.agenda.findMany({
      where: {
        iteneraryId: itineraryId,
      },
      select: {
        id: true,
      },
    });
    const deleteData = async (array) => {
      for (let i = 0; i < array.length; i++) {
        const data = await prisma.attractionsInAgendas.deleteMany({
          where: {
            agendaId: array[i].id,
          },
        });
      }
    };
    const deleteAgendas = async (array) => {
      for (let i = 0; i < array.length; i++) {
        await prisma.agenda.delete({
          where: {
            id: array[i].id,
          },
        });
      }
    };
    await deleteData(agendas);
    await deleteAgendas(agendas);

    await prisma.itenerary.delete({where:
      {
        id: itineraryId,
      }});
    return res.status(200).json({
      'success': true,
      'message': 'Success delete data',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      'success': false,
      'message': 'Internal Server error',
    });
  };
};
