import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll () {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.get(this.url+'/v1/usuario');
  }

  get (id) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.get(this.url+'/v1/usuario/'+id);
  }

  add (body) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.post(this.url+'/v1/usuario', body,{ headers: dataHeaders,});
  }

  edit (id, body) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.post(this.url+'/v1/usuario/'+id, body,{ headers: dataHeaders,});
  }

  delete (id) {
    let dataHeaders = new HttpHeaders();

    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    
    return this.http.delete(this.url+'/v1/usuario/'+id, { headers: dataHeaders,});
  }
  
}

