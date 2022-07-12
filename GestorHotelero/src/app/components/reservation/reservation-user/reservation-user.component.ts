import { Component, OnInit } from '@angular/core';
import { RoomServiceService } from 'src/app/services/roomRest/room-service.service';
import { ActivatedRoute } from '@angular/router';
import{serviceHotelRestService} from 'src/app/services/serviceRest/services-rest.service';
import {ReservationModel} from 'src/app/models/reservation.model';
import {InvoiceModel} from 'src/app/models/invoice.model'
import { Router } from '@angular/router';
import { ReservationRestService } from 'src/app/services/reservationRest/reservation-rest.service'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reservation-user',
  templateUrl: './reservation-user.component.html',
  styleUrls: ['./reservation-user.component.css']
})
export class ReservationUserComponent implements OnInit {
  roomGetId: any;
  reservation: ReservationModel;
  reservations: any;
  idReser: any;

  reservationGetId: any;
  invoiceId:any;
  idHotel: any;
  rooms: any;
  services: any;
  invoice: InvoiceModel;

  constructor(
    private serviceRest: serviceHotelRestService,
    private reservationRest: ReservationRestService,
    private roomRest : RoomServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.reservation = new ReservationModel('', '', '', 0  , '', '', '');
    this.invoice = new InvoiceModel('','','','','','','');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idHotel = idRuta.get('idHotel');
    });
  
    this.getRoomsAvailable();
    this.getRoomsByHotel();
    this.getServiceByHotel();
    this.myReservations();
  }

  getRoomsAvailable(){
    this.roomRest.getRoomsAvailable(this.idHotel).subscribe({
      next: (res:any)=> this.roomGetId = res.rooms,
      error: (err)=> console.log(err.error.message)
    })
  }

  getRoomsByHotel(){
    this.roomRest.getRoomsByHotel(this.idHotel).subscribe({
      next : (res:any)=> this.roomGetId = res.rooms,
      error : (err)=> console.log(err)
    })  
  }

  getServiceByHotel(){
    this.serviceRest.getServiceByHotel(this.idHotel).subscribe({
      next: (res:any)=>this.services = res.services,
      error: (err)=> console.log(err)
    })
  }

  addReservation(addReservationFrom: any){
    this.reservationRest.addReservation(this.idHotel, this.reservation).subscribe({
      next: (res: any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        
        this.myReservations();
        addReservationFrom.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addReservationFrom.reset();
      },
    })
  }

  myReservations(){
    this.reservationRest.myReservations(this.idHotel).subscribe({
      next : (res:any)=> this.reservations = res.reservations,
      error : (err)=> console.log(err)
    })  
  }

  getReservation(id: string) {
    this.reservationRest.getReservation(this.idHotel, id).subscribe({
      next: (res: any) => 
        this.reservationGetId = res.checkReservationHotel, 
        
   
      error: (err) => {Swal.fire({
        icon: 'error',
        title: err.error.message || err.error,
        confirmButtonColor: '#E74C3C'
      });}
    })
  }

  addInvoice(addInvoiceForm: any){
    this.reservationRest.addInvoice(  this.reservationGetId._id, this.invoice).subscribe({
      next: (res: any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });

        this.myReservations();
        addInvoiceForm.reset();
        this.router.navigate(['/invoice/' + this.reservationGetId._id ]);
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addInvoiceForm.reset();
      },
    })
  }

 

}
