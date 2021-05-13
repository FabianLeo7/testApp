import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private api_url = 'https://restcountries.eu/rest/v2/all';

  constructor(
    private Http  : HttpClient,
  ) { }

  /**
   * Display a listing of the resource.
   */
   index() { 
    return this.Http.get(this.api_url).pipe(
      retry(3),
      map(response=>{
        return response;
      })
    );
  }

}
