import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll () {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.get(this.url+'/v1/persona');
  }

  get (id) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.get(this.url+'/v1/persona/'+id);
  }

  add (body) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.post(this.url+'/v1/persona', body,{ headers: dataHeaders,});
  }

  edit (id, body) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.post(this.url+'/v1/persona/'+id, body,{ headers: dataHeaders,});
  }

  delete (id) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.delete(this.url+'/v1/persona/'+id, { headers: dataHeaders,});
  }
  
}

