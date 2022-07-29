import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdminRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken(),
  });

  constructor(
    private http : HttpClient,
    private userRest: UserRestService
  ) { }

  //FUNCIONES DE ADMINISTRADOR//
  getUsers()
  {
    return this.http.get(environment.baseUrl + 'user/getUsers', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }
  getAdminsHotel(){
    return this.http.get(environment.baseUrl + 'user/getAdminsHotel',  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  getUser(id : string)
  {
    return this.http.get(environment.baseUrl + 'user/getUser/' + id,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }
  saveUser(params : {})
  {
    return this.http.post(environment.baseUrl + 'user/saveUserHotel', params, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  deleteUser(id : string)
  {
    return this.http.delete(environment.baseUrl + 'user/deleteUserHotel/' + id,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  updateUser(id: string, params : {})
  {
    return this.http.put(environment.baseUrl + 'user/updateUserHotel/' + id , params,  {
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
