export function createCustoId(
  fullTitle: string,
  directors: string,
  year: number
) {
  const clearedMovieTitle =
    fullTitle.replace(/ /g, '').replace('The', '') + 'xxxx';

  const directorsSplit = directors.split(' ');
  const directorLastName = directorsSplit[directorsSplit.length - 1] + 'xxxx';

  const custoId =
    'mov' +
    year +
    clearedMovieTitle.substr(0, 4) +
    directorLastName.substr(0, 4);

  return custoId;
}
