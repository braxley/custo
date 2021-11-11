import { Ratings } from '../interfaces/imdb.interfaces';

class CustoMovie {
  constructor(
    public fullTitle: string,
    public year: number,
    public image: string,
    public ratings: Ratings,
    public directors: string,
    public stars: string,
    public genres: string,
    public genreList: string[],
    public runtimeMins: number
  ) {}

  get custoId() {
    const clearedMovieTitle = this.fullTitle
      .replace(/ /g, '')
      .replace('the', '');

    const directorLastName = this.directors.split(' ')[-1];

    const custoId =
      'mov' +
      this.year +
      clearedMovieTitle.substr(0, 3) +
      directorLastName.substr(0, 3);

    return custoId;
  }
}
