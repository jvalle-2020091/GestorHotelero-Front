import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  });

  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }

  getHotels() {
    return this.http.get(environment.baseUrl + 'hotel/getHotels', { headers: this.httpOptions });
  }

  addReservation(idHotel: string, params: {}){
    return this.http.post(environment.baseUrl + 'reservation/addReservation/' + idHotel , params, {headers: this.httpOptions})
  }

  myReservations(idHotel: string){
    return this.http.get(environment.baseUrl + 'reservation/myReservations/' + idHotel, {headers: this.httpOptions});
  }

  reservationsByHotel(idHotel: string){
    return this.http.get(environment.baseUrl + 'reservation/getReservationsByHotel/' + idHotel, {headers: this.httpOptions});
  }

  getReservation(idHotel: string, id: string){
    return this.http.get(environment.baseUrl + 'reservation/getReservation/' + idHotel + '/' + id, {headers: this.httpOptions});
  }

  addInvoice(id: string, params: {}){
    return this.http.post(environment.baseUrl + 'invoice/addInvoice/' + id, params , {headers: this.httpOptions});
  }

  getInvoice(idReser: string){
    return this.http.get(environment.baseUrl + 'invoice/getInvoice/' + idReser,{headers: this.httpOptions})
  }

  cancelReservation(idHotel: string, idReservation: string){
    return this.http.delete(environment.baseUrl + 'reservation/deleteReservation/' + idHotel + '/' + idReservation, {headers: this.httpOptions})
  }
}

