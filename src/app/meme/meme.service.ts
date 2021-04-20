import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GiphyResult } from './models/GiphyResult.model';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  constructor(private http: HttpClient) { }

  getTrending(offset: number = 0) {
    let params = new HttpParams();
    params = params.append('api_key', environment.GIPHY_API_KEY);
    params = params.append('offset', String(offset));
    params = params.append('limit', '25');
    return this.http.get<GiphyResult>(environment.GIPHY_API_URL_TRENDING, { params: params });
  }

  getSearchTerm(offset: number = 0, search: string) {
    let params = new HttpParams();
    params = params.append('api_key', environment.GIPHY_API_KEY);
    params = params.append('offset', String(offset));
    params = params.append('limit', '25');
    params = params.append('q', search);
    return this.http.get<GiphyResult>(environment.GIPHY_API_URL_SEARCH, { params: params });    
  }
}
