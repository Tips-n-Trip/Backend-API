const axios = require('axios');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();


module.exports.generate = async (req, res) => {
  try {
    const {destination, duration, budget} = req.body;
    const input = {destination, duration, budget};
    // const response = await axios.post(process.env.MODEL_API_URL, input);
    const response = {'attractions':
    [
      {'place_name': 'Ekowisata Mangrove Wonorejo'},
      {'place_name': 'Taman Harmoni Keputih'},
      {'place_name': 'Air Mancur Menari'},
      {'place_name': 'Ekowisata Mangrove Wonorejo'},
      {'place_name': 'Taman Harmoni Keputih'},
      {'place_name': 'Air Mancur Menari'},
    ]};
    const attractionNameList = response.attractions;
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
          name: duration.concat(' hari di ' + destination),
          duration: duration,
          destination: {
            connect: {id: dest.id},
          },
          isSaved: false,
          user: {
            connect: {id: req.token.id},
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
    const itinerary = await setAgenda(attractionList, newItinerary);

    const result = await prisma.itenerary.findUnique({
      where: {id: itinerary.id},
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
      },
    });
    return res.status(200).json({
      'success': true,
      'message': 'Itinerary generated',
      result,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      'success': false,
      'message': 'Internal Server error',
    });
  };
};
