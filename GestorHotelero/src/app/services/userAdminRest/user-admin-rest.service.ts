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
    return this.http.get(environment.baseUrl + 'user/getUsers', {headers: this.httpOptions});
  }

  getUser(id : string)
  {
    return this.http.get(environment.baseUrl + 'user/getUser/' + id, {headers : this.httpOptions});
  }

  saveUser(params : {})
  {
    return this.http.post(environment.baseUrl + 'user/saveUserHotel', params, {headers: this.httpOptions});
  }

  deleteUser(id : string)
  {
    return this.http.delete(environment.baseUrl + 'user/deleteUserHotel/' + id, {headers: this.httpOptions});
  }

  updateUser(id: string, params : {})
  {
    return this.http.put(environment.baseUrl + 'user/updateUserHotel/' + id , params, {headers: this.httpOptions})
  }


}
