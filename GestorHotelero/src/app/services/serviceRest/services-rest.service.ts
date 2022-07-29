import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class serviceHotelRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : this.userRest.getToken()
  })

  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }

  addService(id: string, params: {}) {
    return this.http.post(environment.baseUrl + 'service/addService/' + id , params, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  getServiceByHotel(id: string){
    return this.http.get(environment.baseUrl + 'service/getServicesByHotel/' + id,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  
  updateService(idHotel: string, id:string, params:{}){
    return this.http.put(environment.baseUrl + 'service/updateService/' + idHotel + '/' + id, params,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }
  deleteService(idHotel: string, id:string){
    return this.http.delete(environment.baseUrl + 'service/deleteService/' + idHotel + '/' + id,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }
  getServices(idHotel: string){
    return this.http.get(environment.baseUrl + 'service/getServices/' + idHotel ,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }
  getService(idHotel: string, id:string){
    return this.http.get(environment.baseUrl + 'service/getService/' + idHotel + '/' + id,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }
  getToken() {
    let globalToken = localStorage.getItem('token');
    let token;
    if (globalToken != undefined) {
      token = globalToken;
    } else {
      token = '';
    }
    return token;
  }


}