import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import {HotelRestService} from 'src/app/services/hotelRest/hotel-rest.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  token:string;
  identity:any;
  role:any;
  username:any;
  name:any;
  filesToUpload:any;
  hotels:any;

  
  uri:any;
  userImage:any;

  constructor(
    private userRest: UserRestService,
    private router: Router,
    private uploadImageRest: UploadImageService,
    private hotelRest: HotelRestService,

    ) { 
      this.token = this.userRest.getToken();
    }
    userGetId: any;
    user: any;


  ngOnInit(): void {
    this.myProfile();
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

  myProfile() {
    this.userRest.myProfile().subscribe({
      next: (res: any) => {
        this.userGetId = res.user;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getUser() {
    this.userRest.myProfile().subscribe({
      next: (res: any) => {
        this.user = res.user;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateProfile() {
   
    this.userRest.updateProfile(this.user).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.myProfile();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  filesChange(inputFile:any){
    this.filesToUpload = <Array<File>>inputFile.target.files;
    console.log(this.filesToUpload);
  }

  uploadImage(){
    this.uploadImageRest.requestFiles(this.identity._id, this.filesToUpload, 'image')
    .then((res:any)=>{
      let resClear = JSON.parse(res);
      if(!resClear.error){
        Swal.fire({
          icon: 'success',
          title: resClear.message,
        });
        localStorage.setItem('identity', JSON.stringify(resClear.updateUser));
        this.myProfile();
        this.userImage = this.userRest.getIdentity().image;
        this.uri = environment.baseUrl + 'user/getImage/' + this.userImage;
      }else{
        Swal.fire({
          icon: 'success',
          title: res,
        });
      }
    })
  }

  deleteProfile() {
    Swal.fire({
      title: 'Are you sure you want to delete your account?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: 'Cancel',
      confirmButtonColor: '#DC3311',
      denyButtonColor: '#118CDC',
    }).then((result) => {
      if (result.isConfirmed) {
    this.userRest.deleteProfile().subscribe({
      next: (res: any) => 
        {
          Swal.fire({
            icon: 'success',
            title: res.message,
          });
          if(this.identity.role == 'CLIENT' || this.identity.role == 'ADMIN-HOTEL' ){              
          localStorage.clear();
          this.router.navigateByUrl('/home');
          }else{
            this.router.navigateByUrl('/myProfile')
          }
        },
      error: (err) => {Swal.fire({
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

  getHotelsHistory() 
  {    
    this.hotelRest.getHotelsHistory().subscribe({
      next: (res: any) =>  this.hotels = res.hotels,
        error: (err) => console.log(err)
    });
  }

}
