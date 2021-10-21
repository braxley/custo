import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ImdbMovieDetails,
  ImdbRatings,
  ImdbResponse,
} from 'src/app/shared/interfaces/imdb.interfaces';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MediumSearchService {
  constructor(private httpClient: HttpClient) {}

  getImdbResults(searchQuery: string): Observable<ImdbResponse> {
    return this.httpClient.get<ImdbResponse>(
      `https://imdb-api.com/en/API/SearchMovie/${environment.API_KEY}/${searchQuery}`
    );
  }

  getImdbMovieDetails(movieId: string): Observable<ImdbMovieDetails> {
    return this.httpClient.get<ImdbMovieDetails>(
      `https://imdb-api.com/en/API/Title/${environment.API_KEY}/${movieId}`
    );
  }

  getRatingsFromImdb(movieId: string): Observable<ImdbRatings> {
    /*
     * this is an exception from the naming convention
     * as it retrieves ratings of other platforms as well (e.g. rotten tomatoes)
     */
    return this.httpClient.get<ImdbRatings>(
      `https://imdb-api.com/API/Ratings/${environment.API_KEY}/${movieId}`
    );
  }
}
