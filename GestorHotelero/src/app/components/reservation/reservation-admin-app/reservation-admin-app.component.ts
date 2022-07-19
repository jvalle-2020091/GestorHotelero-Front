import { Component, OnInit } from '@angular/core';
import {HotelRestService} from 'src/app/services/hotelRest/hotel-rest.service';
import { HotelModel } from 'src/app/models/hotel.model';
import { ReservationRestService } from 'src/app/services/reservationRest/reservation-rest.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-admin-app',
  templateUrl: './reservation-admin-app.component.html',
  styleUrls: ['./reservation-admin-app.component.css']
})
export class ReservationAdminAppComponent implements OnInit {
  hoteles: any;
  hotelUpdate: any;
  reservations: any;
  hotel: HotelModel;


  constructor(
    private hotelRest: HotelRestService,
    private reservationRest: ReservationRestService,

  ) { 
    this.hotel = new HotelModel('', '', '', '', '',  0, '');
  }

  ngOnInit(): void {
    this.getHotels();
   
  }

  getHotels() 
  {
    this.hoteles = [];    
    this.hotelRest.getHotels().subscribe({
      next: (res: any) => this.hoteles = res.hotels,
        error: (err) => console.log(err)
    });
  }

  getHotel(id: string){
    this.hotelRest.getHotel(id).subscribe({
      next: (res:any)=>
        this.hotelUpdate = res.hotel,
      error: (err)=> alert(err.error.message)
    })
  }

  reservationsByHotel(id: string){
    this.reservationRest.reservationsByHotel(id).subscribe({
      next : (res:any)=> this.reservations = res.reservations,
      error : (err)=> console.log(err)
    })  
  }

}
