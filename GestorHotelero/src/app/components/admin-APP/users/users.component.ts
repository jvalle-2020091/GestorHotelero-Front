import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { UserAdminRestService } from 'src/app/services/userAdminRest/user-admin-rest.service'
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  user: UserModel;
  searchUser: any;
  userUpdated: any; 
  token:string;
  identity:any;
  role:any;
  username:any;
  name:any;

  
  uri:any;
  userImage:any;
  

  constructor(
    private userRest: UserRestService,
    private userAdminRest: UserAdminRestService,
  ) { 
    this.user = new UserModel('', '', '', '', '', '', '', '' );
    this.token = this.userRest.getToken();
  }

  ngOnInit(): void {
    this.getUsers();
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;
    this.name = this.userRest.getIdentity().name;

    if(this.token != ''){
      this.userImage = this.userRest.getIdentity().image;
      this.uri = environment.baseUrl + 'user/getImage/' + this.userImage;
    }
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

  getUser(id: string) {
    this.userAdminRest.getUser(id).subscribe({
      next: (res: any) => {
        this.userUpdated = res.user
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  saveUser(addUserForm: any) {
    this.userAdminRest.saveUser(this.user).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getUsers();
          addUserForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addUserForm.reset();
        },
      })
  }

  deleteUser(id: string){
    Swal.fire({
      title: 'Are you sure to remove the user?',
      text: 'This action cannot be reversed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, I want to delete it',
      cancelButtonText: 'Cancell',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userAdminRest.deleteUser(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message + ' ' + res.userDeleted.name,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getUsers();
          },
          error: (err) =>{ Swal.fire({
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

  updateUser()
  {
    this.userUpdated.password = undefined;
    this.userUpdated.reservations = undefined;
    this.userUpdated.history = undefined;
    this.userUpdated.invoice = undefined;

    this.userAdminRest.updateUser(this.userUpdated._id, this.userUpdated).subscribe({

      next: (res:any)=> 
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getUsers();
      },
      error: (err)=>
      {
        
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        this.getUsers()
      },
    })
  }

  

}
