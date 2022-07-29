import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HotelModel } from 'src/app/models/hotel.model';


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
  hotelId: any;
  hotelUpdate: any;
  hoteles: any;
  hotel: HotelModel;

  filesToUpload: any;

  uri:any;
  userImage:any;

  constructor(
    private hotelRest: HotelRestService,
    private userRest: UserRestService,
    private router: Router
  ) { 
    this.token = this.userRest.getToken();
    this.hotel = new HotelModel('', '', '', '', '',  0, '');
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

  getHotel() {
    this.hotelRest.myHotel().subscribe({
      next: (res: any) => {
        this.hotel = res.hotel;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
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
        this.myHotel();
       
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

  updateHotel(){
    this.hotelRest.updateHotel( this.hotelGetId._id, this.hotel).subscribe({
      next: (res:any)=> {
        Swal.fire ({ icon: 'success', title: res.message,});
        console.log(this.hotelId);
        this.myHotel();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  deleteHotel(id:string){
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
    this.hotelRest.deleteHotel(id).subscribe({
      next: (res:any)=> {
        Swal.fire({
          title: res.message + ' ' + res.hotelDeleted.name,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        this.myHotel();
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
    console.log(this.filesToUpload);
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
          this.myHotel();
        } else {
          Swal.fire({
            icon: 'success',
            title: res,
          });
        }
      });
  }

}
