import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private api_url = environment.api_url + '/api/';
  public url : String = '';

  constructor(
    private Http  : HttpClient,
  ) { }

  /**
   * Display a listing of the resource.
   */
  index(search : any = '', page : number = 1, order_name : string = 'name', order : string = 'asc') {
    let params = new HttpParams().set('search', search).set('page', page.toString()).set('order_name', order_name).set('order', order);
 
    return this.Http.get(this.api_url + this.url, {params, observe: 'response'} ).pipe(
      retry(3),
      map(response=>{
        return response;
      })
    );
  }

  /**
   * Store.
   */
  store(data : any) {
    return this.Http.post(this.api_url + this.url, data).pipe(
      retry(3),
      map(response=>{
        return response;
      })
    );
  }

  /**
   * Display the specified resource.
   */
  show(id : any) {
    return this.Http.get<any>(this.api_url + this.url + '/' + id).pipe(retry(3));
  }

    /**
   * Display the specified resource.
   */
  get(dni : any) {
    return this.Http.get<any>(this.api_url + this.url + '/' + dni).pipe(retry(3));
  }

  /**
   * Update the specified resource in storage.
   */
  update(id : any, data : any){
    return this.Http.put<any>(this.api_url + this.url + '/' + id, data).pipe(retry(3));
  }

  /**
   * Remove the specified resource from storage.
   */
  destroy(id : number){
    return this.Http.delete<any>(this.api_url + this.url + '/' + id).pipe(retry(3));
  }

}
