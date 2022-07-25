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
    return this.http.post(environment.baseUrl + 'reservation/addReservation/' + idHotel , params,{headers: {
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    },
  });
}

  myReservations(idHotel: string){
    return this.http.get(environment.baseUrl + 'reservation/myReservationsByHotel/' + idHotel, {headers: {
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    },
  });
}


  reservationsByHotel(idHotel: string){
    return this.http.get(environment.baseUrl + 'reservation/getReservationsByHotel/' + idHotel, {headers: this.httpOptions});
  }

  getReservation(idHotel: string, id: string){
    return this.http.get(environment.baseUrl + 'reservation/getReservation/' + idHotel + '/' + id, {headers: {
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    },
  });
}

  addInvoice(id: string, params: {}){
    return this.http.post(environment.baseUrl + 'invoice/addInvoice/' + id, params , {headers: {
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    },
  });
}
  getInvoice(idReser: string){
    return this.http.get(environment.baseUrl + 'invoice/getInvoice/' + idReser,{headers: {
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    },
  });
}

  cancelReservation(idHotel: string, idReservation: string){
    return this.http.delete(environment.baseUrl + 'reservation/deleteReservation/' + idHotel + '/' + idReservation, {headers: this.httpOptions})
  }

  deleteReservationByAdmin(idHotel: string, idReservation: string){
    return this.http.delete(environment.baseUrl + 'reservation/deleteReservationByAdmin/' + idHotel + '/' + idReservation, {headers: this.httpOptions})
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

