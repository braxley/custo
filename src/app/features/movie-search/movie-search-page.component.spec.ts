import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideAutoSpy, Spy } from 'jasmine-auto-spies';
import { MovieSearchService } from 'src/app/core/services/movie-search.service';
import { CustoMovie } from 'src/app/shared/interfaces/custo-movie.interfaces';
import {
  getMockCustoMovie,
  getMockImdbMovieDetails,
  getMockImdbRatings,
  getMockImdbResults,
} from 'src/app/shared/test/test-data';
import { MovieSearchPageComponent } from './movie-search-page.component';

xdescribe('MovieSearchPageComponent', () => {
  const searchQuery = 'some search query';

  let component: MovieSearchPageComponent;
  let fixture: ComponentFixture<MovieSearchPageComponent>;
  let mediumSearchServiceSpy: Spy<MovieSearchService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieSearchPageComponent],
      imports: [FormsModule],
      providers: [provideAutoSpy(MovieSearchService)],
    }).compileComponents();

    mediumSearchServiceSpy = TestBed.inject<any>(MovieSearchService);
    spyOn((component as any).startSearchAction$$, 'next').and.callThrough();

    fixture = TestBed.createComponent(MovieSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should trigger the startSearchAction subject on search', () => {
  //   spyOn((component as any).startSearchAction$$, 'next').and.callThrough();

  //   component.searchMovie(searchQuery);

  //   expect((component as any).startSearchAction$$.next).toHaveBeenCalledWith(
  //     searchQuery
  //   );
  // });

  it('should call getImdbResults with the search query ', () => {
    component.searchMovie(searchQuery);

    expect(mediumSearchServiceSpy.getImdbResults).toHaveBeenCalledWith(
      searchQuery
    );
  });

  it('should call getImdbMovieDetails and getRatingsFromImdb with the id of the movies', () => {
    const responseData = getMockImdbResults();
    const movieId = 'tt1375666';
    responseData.results = [
      {
        id: movieId,
        resultType: 'Title',
        image: 'someImageUrl',
        title: 'someTitle',
        description: 'someDescription',
      },
    ];

    mediumSearchServiceSpy.getImdbResults.and.nextWith(responseData);

    component.searchMovie(searchQuery);

    expect(mediumSearchServiceSpy.getImdbMovieDetails).toHaveBeenCalledWith(
      movieId
    );
    expect(mediumSearchServiceSpy.getRatingsFromImdb).toHaveBeenCalledWith(
      movieId
    );
  });
  xit('should create the correct CustoMovie', fakeAsync(() => {
    // TODO stf Spec ...has no expectations.'

    const custoMovie = getMockCustoMovie();
    const responseData = getMockImdbResults();
    const movieDetails = getMockImdbMovieDetails();
    const movieRatings = getMockImdbRatings();

    const movieId = custoMovie.custoId;
    const fullTitle = custoMovie.fullTitle;
    const year = custoMovie.year;
    const image = custoMovie.image;
    const ratings = custoMovie.ratings;
    const directors = custoMovie.directors;
    const genres = custoMovie.genres;
    const runtimeMins = custoMovie.runtimeMins;
    const stars = custoMovie.stars;

    responseData.results = [
      {
        id: movieId,
        resultType: 'Movie',
        image: 'https://www.some-url.com',
        title: 'someTitle',
        description: 'someDescription',
      },
    ];

    movieDetails.id = movieId;
    movieDetails.fullTitle = fullTitle;
    movieDetails.year = year.toString();
    movieDetails.image = image;
    movieDetails.directors = directors;
    movieDetails.genres = genres;
    movieDetails.runtimeMins = runtimeMins.toString();
    movieDetails.stars = stars;

    movieRatings.imDbId = movieId;
    movieRatings.imDb = ratings.imdb.toString();
    movieRatings.metacritic = ratings.metacritic.toString();
    movieRatings.theMovieDb = ratings.theMovieDb.toString();
    movieRatings.rottenTomatoes = ratings.rottenTomatoes.toString();
    movieRatings.tV_com = ratings.tV_com.toString();
    movieRatings.filmAffinity = ratings.filmAffinity.toString();

    mediumSearchServiceSpy.getImdbResults.and.nextWith(responseData);
    mediumSearchServiceSpy.getImdbMovieDetails.and.nextWith(movieDetails);
    mediumSearchServiceSpy.getRatingsFromImdb.and.nextWith(movieRatings);

    component.custoMovieResults$.subscribe((results: CustoMovie[]) => {
      expect(results[0]).toEqual(custoMovie);
    });
    component.searchMovie('some query');
    tick();
  }));
});
