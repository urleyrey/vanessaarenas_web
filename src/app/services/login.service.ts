import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login (body) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.post(this.url+'/v1/login', body,{ headers: dataHeaders,});
  }

  getAll () {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.get(this.url+'/v1/persona');
  }
  
}

