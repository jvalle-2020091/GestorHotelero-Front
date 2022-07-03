import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import {HotelRestService} from 'src/app/services/hotelRest/hotel-rest.service';
import { HotelModel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  token:any;
  identity:any;
  role:any;

  hoteles: any;
  hotel: HotelModel;

  constructor(
    private userRest: UserRestService,
    private hotelRest: HotelRestService
  ) { 
    this.hotel = new HotelModel('', '', '', '',  0);
  }

  ngOnInit(): void {
    this.getHotels();
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;
  }

  getHotels() 
  {
    this.hoteles = [];    
    this.hotelRest.getHotels().subscribe({
      next: (res: any) => { this.hoteles = res.hotels,
        console.log(res);
      },
        error: (err) => console.log(err)
    });
  }
}