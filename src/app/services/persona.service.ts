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

  getByRol (rol) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.get(this.url+'/v1/persona/rol/'+rol);
  }

  getByLider (lider) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.get(this.url+'/v1/persona/lider/'+lider);
  }

  getByPuesto (puesto) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.get(this.url+'/v1/persona/puesto/'+puesto);
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

