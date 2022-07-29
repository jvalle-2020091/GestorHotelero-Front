import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken(),
  });

  constructor(
    private http : HttpClient,
    private userRest: UserRestService
  ) { }

//Cliente

    getRoomsByHotel(id: any){
      return this.http.get(environment.baseUrl + 'room/getRoomsByHotel/' + id ,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getToken(),
        },
      });
    }
  
    getRoomsAvailable(idHotel : any){
      return this.http.get(environment.baseUrl + 'room/getRoomsAvailable/' + idHotel,  {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getToken(),
        },
      });
    }

    getRooms(idHotel: any){
      return this.http.get(environment.baseUrl + 'room/getRooms/' + idHotel,  {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getToken(),
        },
      });
    }

    getRoom(idHotel: any, id: any){
      return this.http.get(environment.baseUrl + 'room/getRoom/' + idHotel + '/' + id,  {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getToken(),
        },
      });
    }
  
  //Funciones ADMIN / HOTEL
  
    saveRoom(id: string, params: {}, ){
      return this.http.post(environment.baseUrl + 'room/saveRoom/' + id,  params,  {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getToken(),
        },
      });
    }

    updateRoom(params: {},  idHotel:any, id: any){
      return this.http.put(environment.baseUrl + 'room/updateRoom/' + idHotel + '/' + id, params,  {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getToken(),
        },
      });
    }

    deleteRoom(idHotel:any, id: any, ){
      return this.http.delete(environment.baseUrl + 'room/deleteRoom/' + idHotel + '/' + id ,  {
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
