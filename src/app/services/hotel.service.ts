import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../shared/interfaces/hotel.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private readonly API_URL = 'http://localhost:3000/hotels';

  constructor(private http: HttpClient) { }

  getHotels(
    page: number = 1,
    limit: number = 10,
    name?: string,
    stars?: number[],
    minRate?: number,
    maxPrice?: number
  ): Observable<Hotel[]> {
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    if (name) {
      params = params.set('name_like', name);
    }

    if (stars && stars.length > 0) {
      params = params.set('stars_in', stars.join(','));
    }

    if (minRate !== undefined) {
      params = params.set('rate_gte', minRate.toString());
    }

    if (maxPrice !== undefined) {
      params = params.set('price_lte', maxPrice.toString());
    }

    return this.http.get<Hotel[]>(this.API_URL, { params });
  }
}