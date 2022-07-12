import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { ActivatedRoute } from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { EventAdminRestService } from 'src/app/services/eventRest/event-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']

})
export class EventComponent implements OnInit
{

  token:any;
  identity:any;
  role:any;
  //Variables de TypeScript//
  events: any;
  event: EventModel;
  searchEvent: any;
  eventUpdate: any; 
  eventGetId: any;
  idHotel: any;
  hotelId:any;
  id: any
  
  constructor
  (
    private userRest: UserRestService,
    private eventRest: EventAdminRestService,
    private activatedRoute: ActivatedRoute
  )
  {
    this.event = new EventModel('', '', '', '', '',);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idHotel = idRuta.get('idHotel');
    });
    this.getEvents();
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;
  }

  //METÓDOS DEL CRUD DE//
  getEvents() 
  {
    this.eventRest.getEvents(this.idHotel).subscribe({
      next: (res: any) => { this.events = res.events,
        console.log(res);
        
      },
        error: (err) => console.log(err)
    })
  }

  getEvent(id: string) {
    this.eventRest.getEvent(this.idHotel, id).subscribe({
      next: (res: any) => 
        this.eventGetId = res.checkEventHotel, 
      error: (err) => {Swal.fire({
        icon: 'error',
        title: err.error.message || err.error,
        confirmButtonColor: '#E74C3C'
      });}
    })
  }

  addEvent(addEventForm: any) {
    this.eventRest.addEvent(this.idHotel, this.event).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
            console.log(this.idHotel)
          this.getEvents();
          addEventForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addEventForm.reset();
        },
      })
  }

  deleteEvent(id: string) {
        this.eventRest.deleteEvent(this.idHotel, id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message + ' ' + res.eventoDeleted.name,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getEvents();
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
      }

      updateEvent(){
        this.eventGetId.hotel= undefined;
        this.eventRest.updateEvent(this.eventGetId, this.idHotel, this.eventGetId._id).subscribe({
          next: (res:any)=> {
            Swal.fire ({ icon: 'success', title: res.message,});
            console.log( res);
            this.getEvents();
          },
          error: (err: { error: { message: any; }; })=> {Swal.fire({icon: 'warning', title: err.error.message || err.error, });
        },
        })
      }
}
