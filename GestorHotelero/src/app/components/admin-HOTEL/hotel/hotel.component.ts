import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { HotelModel } from 'src/app/models/hotel.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})

export class HotelComponent implements OnInit {
  hotel: HotelModel;

  constructor(
    private hotelRest: HotelRestService,
  ) {
    this.hotel = new HotelModel('', '', '', '',  0, '');
   }

  ngOnInit(): void {
  }

  saveHotel(){

    this.hotelRest.saveHotel(this.hotel).subscribe({
      next: (res:any) =>{
        console.log(res);
        
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        
       
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
  
      },
    })
  }


}
