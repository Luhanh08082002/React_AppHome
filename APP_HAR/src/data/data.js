const USERS = {
    1: {
      id: 1,
      username: 'Alexia Jane',
      avatar: require('../assets/iconhome.png'),
    },
    2: {
      id: 2,
      username: 'Jacky Depp',
      avatar: require('../assets/iconUser.png'),
    },
  };
  
  const REVIEWS = {
    1: {
      id: 1,
      date: '21 May, 2022',
      author: USERS[1],
      rating: 7,
      text: 'Lorem ipsum dolor sit amet. Iusto nihil et porro soluta ut labore nesciunt sed dolor nihil qui laudantium consequatur',
    },
    2: {
      id: 2,
      date: '14 July, 2021',
      author: USERS[2],
      rating: 9.1,
      text: 'Lorem ipsum dolor sit amet.',
    },
  };
  
  export const HOTELS = {
    1: {
      id: 1,
      title: 'Argos in Cappadocia',
      image: require('../assets/iconUser1.png'),
      location: 'Turkey, Cappadocia',
      rating: 9,
      pricePeerDay: '130$',
      type: 'HOTEL',
    },
    2: {
      id: 2,
      title: 'Sultan Cave Suites',
      image: require('../assets/iconUser1.png'),
      location: 'Turkey, Cappadocia',
      rating: 9.3,
      pricePeerDay: '230$',
      type: 'HOTEL',
    },
  }

  
  export const TOP_PLACES = [
    {
      id: 1,
      image: require('../assets/iconsms.webp'),
      title: 'Amalfi Coast',
      location: 'Italy',
      description:
        'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
      rating: 9.4,
      gallery: [
        require('../assets/iconsms.webp'),
        require('../assets/iconsms.webp'),
      ],
      reviews: [REVIEWS[2], REVIEWS[1]],
      hotels: [HOTELS[9], HOTELS[10]],
      type: 'PLACE',
    },
    {
      id: 4,
      image: require('../assets/iconsms.webp'),
      title: 'Granada',
      location: 'Spain',
      description:
        'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
      rating: 8.9,
      gallery: [],
      reviews: [REVIEWS[1], REVIEWS[2]],
      hotels: [HOTELS[11], HOTELS[12]],
      type: 'PLACE',
    },
  ]
  //   {
  //     id: 6,
  //     image: require('../../assets/images/trips/e57a2a310330ee1d8928eb75d416a53d.jpeg'),
  //     title: 'Cherry blossoms',
  //     location: 'Japan',
  //     description:
  //       "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
  //     rating: 7.4,
  //     gallery: [],
  //     reviews: [REVIEWS[1], REVIEWS[2]],
  //     hotels: [HOTELS[13], HOTELS[14]],
  //     type: 'PLACE',
  //   },
  // ];
  
  export const PLACES = [
    {
      id: 5,
      image: require('../assets/arrow_back.png'),
      title: 'Cappadocia',
      location: 'Turkey',
      description:
        "Cappadocia's landscape includes dramatic expanses of soft volcanic rock, shaped by erosion into towers, cones, valleys, and caves. Rock-cut churches and underground tunnel complexes from the Byzantine and Islamic eras are scattered throughout the countryside.",
      rating: 9.2,
      gallery: [
        require('../assets/iconhome.png'),
        require('../assets/iconhome.png'),
        require('../assets/iconhome.png'),
      ],
      reviews: [REVIEWS[1], REVIEWS[2]],
      hotels: [HOTELS[1], HOTELS[2]],
      type: 'PLACE',
    },
    {
      id: 2,
      image: require('../assets/iconhome.png'),
      title: 'Capri',
      location: 'Italy',
      description:
        'Capri is an island of a thousand faces, where visitors can walk the trails skirting the cliffs above the Mediterranean in total solitude, dive into the crystalline waters of its rocky shore, or plunge into the vibrant crowds of the Piazzetta and shop in the most fashionable boutiques in the world.',
      rating: 9.1,
      gallery: [],
      reviews: [REVIEWS[2], REVIEWS[1]],
      hotels: [HOTELS[3], HOTELS[4]],
      type: 'PLACE',
    },
    {
      id: 3,
      image: require('../assets/iconhome.png'),
      title: 'Bora Bora',
      location: 'Polynesia',
      description:
        'Learn how you can travel Bora Bora on a budget and how overwater bungalows are possible for cheap plus tips on keeping Bora Bora trip costs low.',
      rating: 8.9,
      gallery: [],
      reviews: [REVIEWS[1], REVIEWS[2]],
      hotels: [HOTELS[5], HOTELS[6]],
      type: 'PLACE',
    },
    {
      id: 7,
      image: require('../assets/iconhome.png'),
      title: 'Phuket',
      location: 'Thailand',
      description:
        'Phuket is the largest island in Thailand. It is located in the Andaman Sea in southern Thailand',
      rating: 9.2,
      gallery: [],
      reviews: [REVIEWS[2], REVIEWS[1]],
      hotels: [HOTELS[7], HOTELS[8]],
      type: 'PLACE',
    },
  ];
  
  export const SEARCH_PLACES = [...PLACES, ...TOP_PLACES].map(item => ({
    ...item,
    id: Math.random().toString(),
  }));
  
  export const SEARCH_HOTELS = [...Object.values(HOTELS)].map(item => ({
    ...item,
    id: Math.random().toString(),
  }));
  
  export const SEARCH_ALL = [...SEARCH_PLACES, ...SEARCH_HOTELS];

  export  const user = [
    {
      userID:1,
      name:"Nguyễn Ngọc Thắng",
      phonenumber: '0832241244',
      numberRoom : 4,
    },
    {
      userID:2,
      name:"Phạm Như NGọc",
      phonenumber: '0852545524',
      numberRoom : 7,
    },
    {
      userID:3,
      name:"TRần Văn Hướng",
      phonenumber: '0252055522',
      numberRoom : 2,
    },
    {
      userID:4,
      name:"Trần Văn Hải",
      phonenumber: '08222515622',
      numberRoom : 14,
    }
  ]