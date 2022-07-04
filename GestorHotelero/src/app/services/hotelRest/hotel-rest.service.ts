import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class HotelRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  });

  constructor(
    private http: HttpClient,
    private userRest : UserRestService
  ) { }

  getHotels(){
    return this.http.get(environment.baseUrl + 'hotel/getHotels', {headers: this.httpOptions})
  }

  getHotel(id: string){
    return this.http.get(environment.baseUrl + 'hotel/getHotel/' + id, {headers: this.httpOptions})
  }

  saveHotelByAdmin(params: {}){
    return this.http.post(environment.baseUrl + 'hotel/saveHotelByAdmin', params,{headers: this.httpOptions});
  }

  updateHotelByAdmin(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'hotel/updateHotelByAdmin/' + id, params, {headers: this.httpOptions});
  }

  deleteHotelByAdmin(id:string){
    return this.http.delete(environment.baseUrl + 'hotel/deleteHotelByAdmin/' + id, {headers: this.httpOptions});
  }

  myHotel() {
    return this.http.get(environment.baseUrl + 'hotel/myHotel', 
      {headers: this.httpOptions});
  }

  
}
