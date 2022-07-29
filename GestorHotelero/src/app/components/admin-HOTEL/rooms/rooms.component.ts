import { Component, OnInit } from '@angular/core';
import { RoomServiceService } from 'src/app/services/roomRest/room-service.service';
import { RoomModel} from 'src/app/models/room.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  room : RoomModel;
  roomGetId: any;
  user: UserModel;
  rooms: any;
  roomId: any;
  idHotel: any;
  hotelId:any;
  id: any

  constructor(
    private roomRest : RoomServiceService,
    private activatedRoute: ActivatedRoute 
  ) {
    this.room = new RoomModel('','','','',false,''),
    this.user = new UserModel('', '','','','','','','')
   }

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((idRuta) => {
        this.idHotel = idRuta.get('idHotel');
      });
      this.getRooms();
    }
  

  getRoomsByHotel(id: string){
    this.roomRest.getRoomsByHotel(id).subscribe({
      next : (res:any)=> this.roomGetId = res.checkRoomHotel,
      error : (err)=> console.log(err)
    })  
  }

  getRoomsAvailable(idHotel: string){
    this.roomRest.getRoomsAvailable(idHotel).subscribe({
      next: (res:any)=> this.roomGetId = res.checkRoomHotel,
      error: (err)=> console.log(err.error.message)
    })
  }

  getRooms(){
    this.roomRest.getRooms(this.idHotel).subscribe({
      next: (res:any)=> this.rooms = res.rooms,
      error: (err)=> console.log(err.error.message)
    })
  }

  getRoom( id:string){
    this.roomRest.getRoom(this.idHotel, id).subscribe({
      next: (res:any)=> this.roomGetId = res.checkRoomHotel,
      error : (err)=> console.log(err.error.message)
    })
  }

  //FUNCIONALIDAD ADMIN

  saveRoom(addRoomForm: any) {
    this.roomRest.saveRoom(this.idHotel, this.room).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
            console.log(this.idHotel)
          this.getRooms();
          addRoomForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addRoomForm.reset();
        },
      })
  }


  updateRoom(){
    this.roomGetId.hotel= undefined;
    this.roomRest.updateRoom(this.roomGetId, this.idHotel, this.roomGetId._id).subscribe({
      next : (res: any)=>{
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getRooms();
      },
      error: (err: { error: { message: any; }; })=> {Swal.fire({icon: 'warning', title: err.error.message || err.error, });
    },
    })
  }

  deleteRoom(id: string,){
    Swal.fire({
      title: 'Are you sure to remove the room?',
      text: 'This action cannot be reversed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, I want to delete it',
      cancelButtonText: 'Cancell',
    }).then((result) => {
      if (result.isConfirmed) {
    this.roomRest.deleteRoom(this.idHotel, id ).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message + ' ' + res.roomDeleted.name,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        this.getRooms();
      },
      error: (err: { error: { message: any; }; })=> {Swal.fire({
        title: err.error.message,
        icon: 'error',
        position: 'center',
        timer: 3000
      });
    },
  });
}
});
}

}
