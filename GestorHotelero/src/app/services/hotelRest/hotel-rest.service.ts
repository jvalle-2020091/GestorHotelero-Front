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
    return this.http.get(environment.baseUrl + 'hotel/getHotels', {headers: {
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    },
  });
}

  getHotelsByPopularity(){
    return this.http.get(environment.baseUrl + 'hotel/getHotelsByPopularity', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  getHotel(id: string){
    return this.http.get(environment.baseUrl + 'hotel/getHotel/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  saveHotelByAdmin(params: {}){
    return this.http.post(environment.baseUrl + 'hotel/saveHotelByAdmin', params,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }
  updateHotelByAdmin(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'hotel/updateHotelByAdmin/' + id, params, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }
  deleteHotelByAdmin(id:string){
    return this.http.delete(environment.baseUrl + 'hotel/deleteHotelByAdmin/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }
  myHotel() {
    return this.http.get(environment.baseUrl + 'hotel/myHotel', 
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  getHotelsHistory() {
    return this.http.get(environment.baseUrl + 'hotel/getHotelsHistory', 
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  saveHotel(params: {}){
    return this.http.post(environment.baseUrl + 'hotel/saveHotel', params,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }
  updateHotel(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'hotel/updateHotel/' + id, params,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  deleteHotel(id:string){
    return this.http.delete(environment.baseUrl + 'hotel/deleteHotel/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  requestFiles(hotelId: string, files: Array<File>, name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseUrl + 'hotel/uploadImage/' + hotelId;

      for (var x = 0; x < files.length; x++) {
        formData.append(name, files[x], files[x].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', uri, true);
      xhr.setRequestHeader('Authorization', this.userRest.getToken());
      xhr.send(formData);
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
