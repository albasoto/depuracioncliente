import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:1337/'

  constructor(private httpClient: HttpClient) { }

  get(url, parametros) {

    var params  = new HttpParams()

    for (const key in parametros) {
    params = params.append(key, parametros[key])
    }

    return this.httpClient.get(this.baseUrl+url,{params: params})
  }

  post(url, body){
    return this.httpClient.post(this.baseUrl+url, body);
  }

  delete(url){
    return this.httpClient.delete(this.baseUrl+url);
  }

  patch(url, body){
    return this.httpClient.patch(this.baseUrl+url, body);
  }
}
