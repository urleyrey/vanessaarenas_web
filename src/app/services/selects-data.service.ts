import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectsDataService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  barrios () {
    let dataHeaders = new HttpHeaders();
    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    return this.http.get(this.url+'/v1/barrio');
  }

  comunas () {
    let dataHeaders = new HttpHeaders();
    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    return this.http.get(this.url+'/v1/comuna');
  }

  puestos () {
    let dataHeaders = new HttpHeaders();
    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    return this.http.get(this.url+'/v1/puesto_votacion');
  }

  roles () {
    let dataHeaders = new HttpHeaders();
    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    return this.http.get(this.url+'/v1/rol');
  }

  formatSelect(tipo, data){
    let select:any = [];
    data.forEach(element => {
      if(tipo == 'persona'){
        select.push({'value':element.id, 'text': element.nombres+" "+element.apellidos+", "+element.documento});
      }
      if(tipo == 'barrio'||tipo == 'comuna'||tipo == 'puesto_votacion'||tipo == 'rol'){
        select.push({'value':element.id, 'text': element.nombre});
      }
    });
    return select;
  }
  
}

