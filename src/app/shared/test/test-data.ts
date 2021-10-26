import { CustoMedium } from '../interfaces/custo-medium.interfaces';
import {
  ImdbMovieDetails,
  ImdbRatings,
  ImdbResponse,
} from '../interfaces/imdb.interfaces';

export function getMockCustoMovie(): CustoMedium {
  return {
    imdbId: 'tt1375666',
    fullTitle: 'Inception (2010)',
    year: 2010,
    image:
      'https://imdb-api.com/images/original/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.6762_AL_.jpg',
    ratings: {
      imdb: 8.8,
      metacritic: 74,
      rottenTomatoes: 87,
      theMovieDb: 8.3,
      tV_com: 8.8,
      filmAffinity: 8.0,
    },
    directors: 'Christopher Nolan',
    genres: 'Action, Adventure, Sci-Fi',
    genreList: ['Action', 'Adventure', 'Sci-Fi'],
    runtimeMins: 148,
    stars: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
  };
}

export function getMockImdbResults(): ImdbResponse {
  return {
    searchType: 'Movie',
    expression: 'Inception',
    results: [
      {
        id: 'tt1375666',
        resultType: 'Title',
        image:
          'https://imdb-api.com/images/original/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.7273_AL_.jpg',
        title: 'Inception',
        description: '(2010)',
      },
      {
        id: 'tt5295990',
        resultType: 'Title',
        image:
          'https://imdb-api.com/images/original/MV5BZGFjOTRiYjgtYjEzMS00ZjQ2LTkzY2YtOGQ0NDI2NTVjOGFmXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_Ratio0.7273_AL_.jpg',
        title: 'Inception: Jump Right Into the Action',
        description: '(2010) (Video)',
      },
    ],
  };
}

export function getMockImdbMovieDetails(): ImdbMovieDetails {
  return {
    id: 'tt1375666',
    title: 'Inception',
    originalTitle: '',
    fullTitle: 'Inception (2010)',
    type: 'Movie',
    year: '2010',
    image:
      'https://imdb-api.com/images/original/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.6762_AL_.jpg',
    releaseDate: '2010-07-29',
    runtimeMins: '148',
    runtimeStr: '2h 28min',
    plot: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb&#39;s rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible, inception. Instead of the perfect heist, Cobb and his team of specialists have to pull off the reverse: their task is not to steal an idea, but to plant one. If they succeed, it could be the perfect crime. But no amount of careful planning or expertise can prepare the team for the dangerous enemy that seems to predict their every move. An enemy that only Cobb could have seen coming.',
    plotLocal: '',
    plotLocalIsRtl: false,
    awards:
      'Top rated movie #13 | Won 4 Oscars157 wins & 220 nominations total',
    directors: 'Christopher Nolan',
    directorList: [
      {
        id: 'nm0634240',
        name: 'Christopher Nolan',
      },
    ],
    writers: 'Christopher Nolan',
    writerList: [
      {
        id: 'nm0634240',
        name: 'Christopher Nolan',
      },
    ],
    stars: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
    starList: [
      {
        id: 'nm0000138',
        name: 'Leonardo DiCaprio',
      },
      {
        id: 'nm0330687',
        name: 'Joseph Gordon-Levitt',
      },
      {
        id: 'nm0680983',
        name: 'Elliot Page',
      },
    ],
    actorList: [
      {
        id: 'nm0000138',
        image:
          'https://imdb-api.com/images/original/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_Ratio1.0000_AL_.jpg',
        name: 'Leonardo DiCaprio',
        asCharacter: 'Cobbas Cobb',
      },
      {
        id: 'nm0330687',
        image:
          'https://imdb-api.com/images/original/MV5BMTY3NTk0NDI3Ml5BMl5BanBnXkFtZTgwNDA3NjY0MjE@._V1_Ratio1.0000_AL_.jpg',
        name: 'Joseph Gordon-Levitt',
        asCharacter: 'Arthuras Arthur',
      },
      {
        id: 'nm0680983',
        image:
          'https://imdb-api.com/images/original/MV5BYWY0NzFmYjAtYzMwNC00ODc3LWI2ZWEtOTU3YTM0Y2ZiNTM5XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_Ratio1.0000_AL_.jpg',
        name: 'Elliot Page',
        asCharacter: 'Ariadneas Ariadne',
      },
      {
        id: 'nm0913822',
        image:
          'https://imdb-api.com/images/original/MV5BMTQzMTUzNjc4Nl5BMl5BanBnXkFtZTcwMTUyODU2Mw@@._V1_Ratio1.0000_AL_.jpg',
        name: 'Ken Watanabe',
        asCharacter: 'Saitoas Saito',
      },
      {
        id: 'nm0362766',
        image:
          'https://imdb-api.com/images/original/MV5BMTQ3ODEyNjA4Nl5BMl5BanBnXkFtZTgwMTE4ODMyMjE@._V1_Ratio1.0000_AL_.jpg',
        name: 'Tom Hardy',
        asCharacter: 'Eamesas Eames',
      },
      {
        id: 'nm2438307',
        image:
          'https://imdb-api.com/images/original/MV5BMTI5Nzc2NTc2MF5BMl5BanBnXkFtZTcwMDM2MTc1Mg@@._V1_Ratio1.5000_AL_.jpg',
        name: 'Dileep Rao',
        asCharacter: 'Yusufas Yusuf',
      },
      {
        id: 'nm0614165',
        image:
          'https://imdb-api.com/images/original/MV5BMTUzMjg1NzIyOV5BMl5BanBnXkFtZTYwMzg2Mjgy._V1_Ratio1.0000_AL_.jpg',
        name: 'Cillian Murphy',
        asCharacter: 'Robert Fischeras Robert Fischer',
      },
      {
        id: 'nm0000297',
        image:
          'https://imdb-api.com/images/original/MV5BMTk1OTQ5MzUzM15BMl5BanBnXkFtZTgwMDUxMTY1NDE@._V1_Ratio1.0000_AL_.jpg',
        name: 'Tom Berenger',
        asCharacter: 'Browningas Browning',
      },
      {
        id: 'nm0182839',
        image:
          'https://imdb-api.com/images/original/MV5BMTQxNTEzNTkwNF5BMl5BanBnXkFtZTcwNzQ2NDIwOQ@@._V1_Ratio1.0000_AL_.jpg',
        name: 'Marion Cotillard',
        asCharacter: 'Malas Mal',
      },
      {
        id: 'nm0000592',
        image:
          'https://imdb-api.com/images/original/MV5BMTMyMjIxMTQ2NV5BMl5BanBnXkFtZTYwNDQ0NTE1._V1_Ratio1.0000_AL_.jpg',
        name: 'Pete Postlethwaite',
        asCharacter: 'Maurice Fischeras Maurice Fischer',
      },
      {
        id: 'nm0000323',
        image:
          'https://imdb-api.com/images/original/MV5BMjAwNzIwNTQ4Ml5BMl5BanBnXkFtZTYwMzE1MTUz._V1_Ratio1.0000_AL_.jpg',
        name: 'Michael Caine',
        asCharacter: 'Milesas Miles',
      },
      {
        id: 'nm0001305',
        image:
          'https://imdb-api.com/images/original/MV5BMTQ3MjU1MDMxM15BMl5BanBnXkFtZTgwODk5ODE4MDE@._V1_Ratio1.0000_AL_.jpg',
        name: 'Lukas Haas',
        asCharacter: 'Nashas Nash',
      },
      {
        id: 'nm2581730',
        image: 'https://imdb-api.com/images/original/nopicture.jpg',
        name: 'Tai-Li Lee',
        asCharacter: 'Tadashias Tadashi',
      },
      {
        id: 'nm3637500',
        image:
          'https://imdb-api.com/images/original/MV5BNGY5NWFkMTItNGFkNi00NzNiLWEyMDctZmM0NWNjMmVkNjg2XkEyXkFqcGdeQXVyMTAwMzUyMzUy._V1_Ratio1.0000_AL_.jpg',
        name: 'Claire Geare',
        asCharacter: 'Phillipa (3 Years Old)as Phillipa (3 Years Old)',
      },
      {
        id: 'nm3960408',
        image:
          'https://imdb-api.com/images/original/MV5BN2ZjZTA4MGUtNGFiOS00MmExLTljMTQtNmVlODJmYTU2ZDU4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNDAxOTExNTM@._V1_Ratio2.4000_AL_.jpg',
        name: 'Magnus Nolan',
        asCharacter: 'James (20 Months Old)as James (20 Months Old)',
      },
      {
        id: 'nm2855622',
        image:
          'https://imdb-api.com/images/original/MV5BMDdlNjExMWUtNjU1ZC00NTgwLWFjMzItM2UxN2EyMzkwM2U3XkEyXkFqcGdeQXVyMTI0NjI2Mzg5._V1_Ratio1.0000_AL_.jpg',
        name: 'Taylor Geare',
        asCharacter: 'Phillipa (5 Years Old)as Phillipa (5 Years Old)',
      },
      {
        id: 'nm3638213',
        image: 'https://imdb-api.com/images/original/nopicture.jpg',
        name: 'Johnathan Geare',
        asCharacter: 'James (3 Years Old)as James (3 Years Old)',
      },
      {
        id: 'nm0556070',
        image:
          'https://imdb-api.com/images/original/MV5BNmVlMWVhYzktODE1Ny00YWYzLTlhOGYtNTZlZmNkMTJiMDAyXkEyXkFqcGdeQXVyNDAxMDUxOA@@._V1_Ratio1.0000_AL_.jpg',
        name: 'Tohoru Masamune',
        asCharacter: 'Japanese Security Guardas Japanese Security Guard',
      },
    ],
    fullCast: null,
    genres: 'Action, Adventure, Sci-Fi',
    genreList: [
      {
        key: 'Action',
        value: 'Action',
      },
      {
        key: 'Adventure',
        value: 'Adventure',
      },
      {
        key: 'Sci-Fi',
        value: 'Sci-Fi',
      },
    ],
    companies: 'Warner Bros., Legendary Entertainment, Syncopy',
    companyList: [
      {
        id: 'co0002663',
        name: 'Warner Bros.',
      },
      {
        id: 'co0159111',
        name: 'Legendary Entertainment',
      },
      {
        id: 'co0147954',
        name: 'Syncopy',
      },
    ],
    countries: 'USA, UK',
    countryList: [
      {
        key: 'USA',
        value: 'USA',
      },
      {
        key: 'UK',
        value: 'UK',
      },
    ],
    languages: 'English, Japanese, French',
    languageList: [
      {
        key: 'English',
        value: 'English',
      },
      {
        key: 'Japanese',
        value: 'Japanese',
      },
      {
        key: 'French',
        value: 'French',
      },
    ],
    contentRating: '12',
    imDbRating: '8.8',
    imDbRatingVotes: '2144730',
    metacriticRating: '74',
    boxOffice: {
      budget: '$160,000,000 (estimated)',
      openingWeekendUSA: '$62,785,337',
      grossUSA: '$292,576,195',
      cumulativeWorldwideGross: '$836,836,967',
    },
    tagline: 'Your mind is the scene of the crime',
    keywords: 'dream,ambiguous ending,subconscious,surprise ending,mindbender',
    keywordList: [
      'dream',
      'ambiguous ending',
      'subconscious',
      'surprise ending',
      'mindbender',
    ],
    similars: [
      {
        id: 'tt0816692',
        title: 'Interstellar',
        fullTitle: 'Interstellar',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6763_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '8.6',
      },
      {
        id: 'tt0468569',
        title: 'The Dark Knight',
        fullTitle: 'The Dark Knight',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_Ratio0.6763_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '9.0',
      },
      {
        id: 'tt0137523',
        title: 'Fight Club',
        fullTitle: 'Fight Club',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.6763_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '8.8',
      },
      {
        id: 'tt0109830',
        title: 'Forrest Gump',
        fullTitle: 'Forrest Gump',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6957_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '8.8',
      },
      {
        id: 'tt0110912',
        title: 'Pulp Fiction',
        fullTitle: 'Pulp Fiction',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.6860_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '8.9',
      },
      {
        id: 'tt0133093',
        title: 'Matrix',
        fullTitle: 'Matrix',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_Ratio0.6763_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '8.7',
      },
      {
        id: 'tt0111161',
        title: 'Die Verurteilten',
        fullTitle: 'Die Verurteilten',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6763_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '9.3',
      },
      {
        id: 'tt0114369',
        title: 'Sieben',
        fullTitle: 'Sieben',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_Ratio0.6763_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '8.6',
      },
      {
        id: 'tt0482571',
        title: 'Prestige: Die Meister der Magie',
        fullTitle: 'Prestige: Die Meister der Magie',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_Ratio0.6763_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '8.5',
      },
      {
        id: 'tt7286456',
        title: 'Joker',
        fullTitle: 'Joker',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6763_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '8.4',
      },
      {
        id: 'tt1345836',
        title: 'The Dark Knight Rises',
        fullTitle: 'The Dark Knight Rises',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_Ratio0.6763_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '8.4',
      },
      {
        id: 'tt0993846',
        title: 'The Wolf of Wall Street',
        fullTitle: 'The Wolf of Wall Street',
        year: '',
        image:
          'https://imdb-api.com/images/original/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_Ratio0.6763_AL_.jpg',
        plot: '',
        directors: '',
        stars: '',
        genres: '',
        imDbRating: '8.2',
      },
    ],
  };
}

export function getMockImdbRatings(): ImdbRatings {
  return {
    imDbId: 'tt1375666',
    title: 'Inception',
    fullTitle: 'Inception (2010)',
    type: 'Movie',
    year: '2010',
    imDb: '8.8',
    metacritic: '74',
    theMovieDb: '8.3',
    rottenTomatoes: '87',
    tV_com: '8.8',
    filmAffinity: '8.0',
  };
}
