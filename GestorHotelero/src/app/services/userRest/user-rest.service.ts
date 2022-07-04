import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
/*import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';*/

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    /*private fireAuth: AngularFireAuth*/
  ) { }

  //Funciones públicas
  register(params: {}) {
    return this.http.post(environment.baseUrl + 'user/register', params, {
      headers: this.httpOptions,
    });
  }

  login(params: {}) {
    return this.http.post(environment.baseUrl + 'user/login', params, {
      headers: this.httpOptions,
    });
  }

  myProfile() {
    return this.http.get(environment.baseUrl + 'user/myProfile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  updateProfile(params: {}) {
    return this.http.put(environment.baseUrl + 'user/update', params, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  deleteProfile() {
    return this.http.delete(environment.baseUrl + 'user/delete', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  // Solicitar el token
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

  getIdentity(){
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if(globalIdentity != undefined){
      identity = JSON.parse(globalIdentity);
    }else{
      identity = ''
    }
    return identity
  }

  /*logOut(){
    this.fireAuth.signOut();
  }
}*/

}
