require('dotenv').config();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line require-jsdoc
async function seed() {
  const attractionInJakarta = JSON.parse(
      fs.readFileSync(
          path.resolve('./prisma/seeders/jakarta_attraction.json'),
      ),
  );
  const souvenirInJakarta = JSON.parse(
      fs.readFileSync(
          path.resolve('./prisma/seeders/jakarta_souvenir.json'),
      ),
  );
  const attractionInYogyakarta = JSON.parse(
      fs.readFileSync(
          path.resolve('./prisma/seeders/yogyakarta_attraction.json'),
      ),
  );
  const souvenirInYogyakarta = JSON.parse(
      fs.readFileSync(
          path.resolve('./prisma/seeders/yogyakarta_souvenir.json'),
      ),
  );
  const jakarta = await prisma.destination.create({
    data: {
      image_path: 'https://storage.googleapis.com/tips-n-trip-bucket-app/destinations/hFDTgnADbby5J4CUJCSQ.jpg',
      name: 'Jakarta',
      about: 'Daerah Khusus Ibukota Jakarta (DKI Jakarta) adalah ibu kota negara dan kota terbesar di Indonesia. Jakarta merupakan satu-satunya kota di Indonesia yang memiliki status setingkat provinsi. Jakarta terletak di pesisir bagian barat laut Pulau Jawa. Dahulu pernah dikenal dengan beberapa nama di antaranya Sunda Kelapa, Jayakarta, dan Batavia. Di dunia internasional Jakarta juga mempunyai julukan J-Town, atau lebih populer lagi The Big Durian karena dianggap kota yang sebanding New York City (Big Apple) di Indonesia.Jakarta memiliki luas sekitar 661,52 km² (lautan: 6.977,5 km²), dengan penduduk berjumlah 10.187.595 jiwa (2011).',
    },
  });
  for (let i = 0; i < attractionInJakarta.length; i++) {
    const jktDestination = await prisma.attraction.create({
      data: {
        name: attractionInJakarta[i].name,
        image_path: attractionInJakarta[i].image_path,
        recomendation_time: attractionInJakarta[i].recomendation_time,
        latitude: attractionInJakarta[i].latitude,
        longitude: attractionInJakarta[i].longitude,
        htm: attractionInJakarta[i].htm,
        about: attractionInJakarta[i].about,
        destinationId: jakarta.id,
      },
    });
  }
  for (let s = 0; s < souvenirInJakarta.length; s++) {
    const jktSouvenir = await prisma.souvenir.create({
      data: {
        name: souvenirInJakarta[s].name,
        image_path: souvenirInJakarta[s].image_path,
        open_hour: souvenirInJakarta[s].open_hour,
        latitude: souvenirInJakarta[s].latitude,
        longitude: souvenirInJakarta[s].longitude,
        about: souvenirInJakarta[s].about,
        destinationId: jakarta.id,
      },
    });
  }
  const yogyakarta = await prisma.destination.create({
    data: {
      image_path: 'https://storage.googleapis.com/tips-n-trip-bucket-app/destinations/fXm4YMi4waCd6gVyVIVN.jpg',
      name: 'Yogyakarta',
      about: 'Yogyakarta merupakan sebuah daerah istimewa dalam Negara Kesatuan Republik Indonesia yang masih mempertahankan tata pemerintahan berbentuk kesultanan dalam pemerintahan daerahnya. Pada jaman sebelum kemerdekaan, Jogja merupakan daerah dengan pemerintahan sendiri yang bergelar Kesultanan Ngayogyakarta dan Kadipaten Pakualaman. Wilayah ini memiliki tata kelola pemerintahan dengan sistem kesultanan. Namun setelah RI merdeka, kedua pemerintahan ini bergabung dalam wilayah kesatuan RI dengan Undang-undang Istimewa yang mengatur tata pemerintahan daerahnya.',
    },
  });
  for (let j = 0; j < attractionInYogyakarta.length; j++) {
    const ykDestination = await prisma.attraction.create({
      data: {
        name: attractionInYogyakarta[j].name,
        image_path: attractionInYogyakarta[j].image_path,
        recomendation_time: attractionInYogyakarta[j].recomendation_time,
        latitude: attractionInYogyakarta[j].latitude,
        longitude: attractionInYogyakarta[j].longitude,
        htm: attractionInYogyakarta[j].htm,
        about: attractionInYogyakarta[j].about,
        destinationId: yogyakarta.id,
      },
    });
  }
  for (let s = 0; s < souvenirInYogyakarta.length; s++) {
    const ykSouvenir = await prisma.souvenir.create({
      data: {
        name: souvenirInYogyakarta[s].name,
        image_path: souvenirInYogyakarta[s].image_path,
        open_hour: souvenirInYogyakarta[s].open_hour,
        latitude: souvenirInYogyakarta[s].latitude,
        longitude: souvenirInYogyakarta[s].longitude,
        about: souvenirInYogyakarta[s].about,
        destinationId: yogyakarta.id,
      },
    });
  }
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
