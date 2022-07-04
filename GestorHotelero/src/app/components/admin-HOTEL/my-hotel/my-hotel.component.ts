import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-hotel',
  templateUrl: './my-hotel.component.html',
  styleUrls: ['./my-hotel.component.css']
})
export class MyHotelComponent implements OnInit {
  token:string;
  identity:any;
  role:any;
  username:any;
  name:any;

  uri:any;
  userImage:any;

  constructor(
    private hotelRest: HotelRestService,
    private userRest: UserRestService,
    private router: Router
  ) { 
    this.token = this.userRest.getToken();
  }

  hotelGetId: any;

  ngOnInit(): void {
    this.myHotel();
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;
    this.name = this.userRest.getIdentity().name;
    let outService = localStorage.getItem('outService');
    if(this.token != ''){
      this.userImage = this.userRest.getIdentity().image;
      this.uri = environment.baseUrl + 'user/getImage/' + this.userImage;
    }
  }

  ngDoCheck(): void {
    let outService = localStorage.getItem('outService');
    if(this.token != '' && outService == 'false'){
      this.userImage = this.userRest.getIdentity().image;
      this.uri = environment.baseUrl + 'user/getImage/' + this.userImage;
    }
  }

  myHotel() {
    this.hotelRest.myHotel().subscribe({
      next: (res: any) => {
        this.hotelGetId = res.hotel;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

}
