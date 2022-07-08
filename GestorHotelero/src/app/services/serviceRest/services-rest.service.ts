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
    return this.http.post(environment.baseUrl + 'service/addService/' + id , params, { headers: this.httpOptions });
  }

  getServiceByHotel(id: string){
    return this.http.get(environment.baseUrl + 'service/getServicesByHotel/' + id, {headers: this.httpOptions});
  }

  
  updateService(idHotel: string, id:string, params:{}){
    return this.http.put(environment.baseUrl + 'service/updateService/' + idHotel + '/' + id, params, {headers: this.httpOptions});
  }

  deleteService(idHotel: string, id:string){
    return this.http.delete(environment.baseUrl + 'service/deleteService/' + idHotel + '/' + id, {headers: this.httpOptions});
  }

  getServices(idHotel: string){
    return this.http.get(environment.baseUrl + 'service/getServices/' + idHotel , {headers: this.httpOptions});
  }

  getService(idHotel: string, id:string){
    return this.http.get(environment.baseUrl + 'service/getService/' + idHotel + '/' + id, {headers: this.httpOptions});
  }



}