import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';


@Injectable({
  providedIn: 'root'
})
export class EventAdminRestService 
{

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken(),
  });

  constructor
  (
    private http : HttpClient,
    private userRest: UserRestService
  )
  {}


  //FUNCIONES DE ADMINISTRADOR//
  getEvents(idHotel: string)
  {
    return this.http.get(environment.baseUrl + 'event/getEvents/' + idHotel,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  getEvent(idHotel: string, id : string)
  {
    return this.http.get(environment.baseUrl + 'event/getEvent/' + idHotel + '/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  addEvent(id : string, params : {})
  {
    return this.http.post(environment.baseUrl + 'event/addEvent/' + id, params, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  deleteEvent(idHotel: string, id : string)
  {
    return this.http.delete(environment.baseUrl + 'event/deleteEvent/' + idHotel + '/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }
  
  updateEvent( params : {}, idHotel: string, id: string)
  {
    return this.http.put(environment.baseUrl + 'event/updateEvent/' + idHotel + '/' + id, params, {
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
