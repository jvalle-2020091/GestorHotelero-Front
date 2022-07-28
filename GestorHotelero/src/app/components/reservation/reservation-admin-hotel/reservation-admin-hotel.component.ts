import { Component, OnInit } from '@angular/core';
import { ReservationRestService } from 'src/app/services/reservationRest/reservation-rest.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-reservation-admin-hotel',
  templateUrl: './reservation-admin-hotel.component.html',
  styleUrls: ['./reservation-admin-hotel.component.css']
})
export class ReservationAdminHotelComponent implements OnInit {
  hoteles: any;
  hotelUpdate: any;
  reservations: any;
  idHotel: any;
  searchUser: any;


  constructor(
    private reservationRest: ReservationRestService,
    private activatedRoute: ActivatedRoute 


  ) { 

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idHotel = idRuta.get('idHotel');
    });
    this.reservationsByHotel();
  }


  reservationsByHotel(){
    this.reservationRest.reservationsByHotel(this.idHotel ).subscribe({
      next : (res:any)=>{ this.reservations = res.reservations,
      console.log(this.reservations);
      
      },
      error : (err)=> console.log(err)
    })  
  }

  cancelReservation(idReservation: string){
    this.reservationRest.deleteReservationByAdmin(this.idHotel,  idReservation ).subscribe({  
      next: (res: any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        this.reservationsByHotel();
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

  refresh(): void{
    window.location.reload();
  } 

}
