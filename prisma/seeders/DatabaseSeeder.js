const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// eslint-disable-next-line require-jsdoc
async function seed() {
  const malang = await prisma.destination.create({
    data: {
      image_path: 'img/dest/malang.jpg',
      name: 'Malang',
      about: 'Malang adalah',
      attractions: {
        createMany: {
          data: [
            {
              image_path: 'img/attr/sendiki.jpg',
              name: 'Pantai Sendiki',
              address: 'Jalur Lintar Selatan',
              open_hour: '08:00',
              close_hour: '18:00',
              maps_link: '<maps-link>',
              about: 'Pantai Sendiki adalah',
              recomendation_time: 'Day',
            },
            {
              image_path: 'img/attr/sendangbiru.jpg',
              name: 'Pantai Sendang Biru',
              address: 'Jalur Lintas Selatan',
              open_hour: '08:00',
              close_hour: '18:00',
              maps_link: '<maps-link>',
              about: 'Pantai Sendang Biru adalah',
              recomendation_time: 'Day',
            },
            {
              image_path: 'img/attr/sumbermaron.jpg',
              name: 'Sumber Maron',
              address: 'Jalur Lintas Selatan',
              open_hour: '08:00',
              close_hour: '18:00',
              maps_link: '<maps-link>',
              about: 'Sumber Maron adalah',
              recomendation_time: 'Day',
            },
          ],
        },
      },
      souvenirs: {
        createMany: {
          data: [
            {
              image_path: 'img/attr/tokowijaya.jpg',
              name: 'Toko Wijaya',
              address: 'Jl S Parman',
              open_hour: '08:00',
              close_hour: '18:00',
              maps_link: '<maps-link>',
              about: 'Toko Wijaya adalah',
            },
            {
              image_path: 'img/attr/malangstrudel.jpg',
              name: 'Malang Strudel',
              address: 'Singosari',
              open_hour: '08:00',
              close_hour: '18:00',
              maps_link: '<maps-link>',
              about: 'Malang Strudel menjual',
            },
            {
              image_path: 'img/attr/pia.jpg',
              name: 'Pia Cap Mangkok',
              address: 'Jl Hamid Rusdi',
              open_hour: '08:00',
              close_hour: '18:00',
              maps_link: '<maps-link>',
              about: 'Pia Cap Mangkok telah berdiri sejak',
            },
          ],
        },
      },
    },
  });
  const bandung = await prisma.destination.create({
    data: {
      image_path: 'img/dest/bandung.jpg',
      name: 'Bandung',
      about: 'Bandung adalah',
    },
  });
  console.log(malang, bandung);
}

seed()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
