export interface ImdbResponse {
  searchType: string;
  expression: string;
  results: ImdbMovieResult[];
}

export interface ImdbMovieResult {
  id: string;
  title: string;
  resultType: string;
  description: string;
  image: string;
}

export interface Ratings {
  imdb: number;
  metacritic: number;
  theMovieDb: number;
  rottenTomatoes: number;
  tV_com: number;
  filmAffinity: number;
}

export interface ImdbPerson {
  id: string;
  name: string;
}
export interface ImdbActor extends ImdbPerson {
  image: string;
  asCharacter: string;
}

export interface ImdbCountry {
  key: string;
  value: string;
}
export interface ImdbGenre {
  key: string;
  value: string;
}

export interface ImdbLanguage {
  key: string;
  value: string;
}

export interface ImdbSimilarTitles {
  id: string;
  title: string;
  fullTitle: string;
  year: string;
  image: string;
  plot: string;
  directors: string;
  stars: string;
  genres: string;
  imDbRating: string;
}

export interface ImdbMovieDetails {
  id: string;
  title: string;
  originalTitle: string;
  fullTitle: string;
  type: string;
  year: string;
  image: string;
  releaseDate: string;
  runtimeMins: string;
  runtimeStr: string;
  plot: string;
  plotLocal: string;
  plotLocalIsRtl: boolean;
  awards: string;
  directors: string;
  directorList: ImdbPerson[];
  writers: string;
  writerList: ImdbPerson[];
  stars: string;
  starList: ImdbPerson[];
  actorList: ImdbActor[];
  fullCast: null;
  genres: string;
  genreList: ImdbGenre[];
  companies: string;
  companyList: { id: string; name: string }[];
  countries: string;
  countryList: ImdbCountry[];
  languages: string;
  languageList: ImdbLanguage[];
  contentRating: string;
  imDbRating: string;
  imDbRatingVotes: string;
  metacriticRating: string;
  boxOffice: {
    budget: string;
    openingWeekendUSA: string;
    grossUSA: string;
    cumulativeWorldwideGross: string;
  };
  tagline: string;
  keywords: string;
  keywordList: string[];
  similars: ImdbSimilarTitles[];
}

export interface ImdbRatings {
  imDbId: string;
  title: string;
  fullTitle: string;
  type: string;
  year: string;
  imDb: string;
  metacritic: string;
  theMovieDb: string;
  rottenTomatoes: string;
  tV_com: string;
  filmAffinity: string;
}
