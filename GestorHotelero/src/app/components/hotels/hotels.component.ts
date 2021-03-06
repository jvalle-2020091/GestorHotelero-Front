import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { UserAdminRestService } from 'src/app/services/userAdminRest/user-admin-rest.service';
import {HotelRestService} from 'src/app/services/hotelRest/hotel-rest.service';
import { HotelModel } from 'src/app/models/hotel.model';
import { Chart, registerables } from 'chart.js';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  token:any;
  identity:any;
  role:any;
  users:any;
  hotelId: any;
  hotelUpdate: any;
  searchHotel: String = '';

  usersAdmin:any;
  filesToUpload: any;

  hoteles: any;
  hotel: HotelModel;

  constructor(
    private userRest: UserRestService,
    private hotelRest: HotelRestService,
    private userAdminRest: UserAdminRestService
  ) { 
    this.hotel = new HotelModel('', '', '', '', '',  0, '');
    Chart.register(...registerables);
  }
  hotelGetId: any;

  ngOnInit(): void {
    this.getHotels();
    this.getUsers();
    this.getAdminsHotel();
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;

    
    
  }




  getHotels() 
  {
    this.hoteles = [];    
    this.hotelRest.getHotels().subscribe({
      next: (res: any) =>  this.hoteles = res.hotels,
        error: (err) => console.log(err)
    });
  }

  getHotelsByPopularity() 
  {
    this.hoteles = [];    
    this.hotelRest.getHotelsByPopularity().subscribe({
      next: (res: any) =>  this.hoteles = res.hotels,
        error: (err) => console.log(err)
    });
  }

  getHotel(id: string){
    this.hotelRest.getHotel(id).subscribe({
      next: (res:any)=>{
        this.hotelUpdate = res.hotel;
      },
      error: (err)=> alert(err.error.message)
    })
  }

  getUsers(){
    this.userAdminRest.getUsers().subscribe({
      next: (res: any) => 
        this.users = res.usersExist,
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  
  getAdminsHotel(){
    this.userAdminRest.getAdminsHotel().subscribe({
      next: (res: any) => 
        this.usersAdmin = res.usersExist,
       
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  saveHotelByAdmin(addHotelForm:any){
    this.hotelRest.saveHotelByAdmin(this.hotel).subscribe({
      next: (res:any) =>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        this.getHotels();
        addHotelForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addHotelForm.reset();
      },
    })
  }

  updateHotelByAdmin(){
    this.hotelRest.updateHotelByAdmin( this.hotelUpdate._id, this.hotelUpdate).subscribe({
      next: (res:any)=> {
        Swal.fire ({ icon: 'success', title: res.message,});
        this.getHotels();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  deleteHotelByAdmin(id:string){
    Swal.fire({
      title: 'Are you sure to remove the hotel?',
      text: 'This action cannot be reversed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, I want to delete it',
      cancelButtonText: 'Cancell',
    }).then((result) => {
      if (result.isConfirmed) {
    this.hotelRest.deleteHotelByAdmin(id).subscribe({
      next: (res:any)=> {
        Swal.fire({
          title: res.message + ' ' + res.hotelDeleted.name,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        this.getHotels();
      },
      error: (err)=> {Swal.fire({
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

  filesChange(inputFile: any) {
    this.filesToUpload = <Array<File>>inputFile.target.files;
  }

  uploadImage() {
    this.hotelRest
      .requestFiles(this.hotelGetId._id, this.filesToUpload, 'image')
      .then((res: any) => {
        let resClear = JSON.parse(res);
        if (!resClear.error) {
          Swal.fire({
            icon: 'success',
            title: resClear.message,
          });
          this.getHotels();
        } else {
          Swal.fire({
            icon: 'success',
            title: res,
          });
        }
      });
  }

}