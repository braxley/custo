export function createCustoId(
  fullTitle: string,
  directors: string,
  year: number
) {
  const clearedMovieTitle =
    fullTitle.replace(/ /g, '').replace('The', '') + 'xxxx';

  const directorLastName = directors.split(' ')[1] + 'xxxx';

  const custoId =
    'mov' +
    year +
    clearedMovieTitle.substr(0, 4) +
    directorLastName.substr(0, 4);

  return custoId;
}
