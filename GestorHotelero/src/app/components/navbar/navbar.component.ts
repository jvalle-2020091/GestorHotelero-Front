import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:string;
  identity:any;
  role:any;
  username:any;
  name:any;

  
  uri:any;
  userImage:any;

  constructor(
    private userRest: UserRestService,
    private router: Router
    ) { 
      this.token = this.userRest.getToken();
    }

  ngOnInit(): void {
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;
    this.name = this.userRest.getIdentity().name;

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

  logOut(){
   // this.userRest.logOut();
    localStorage.clear();
    this.router.navigateByUrl('');
    Swal.fire({
      icon:'success',
      title:'Loged Out',
      text:'Log Out successfully, Have a nice day!'
    })
  }

}
