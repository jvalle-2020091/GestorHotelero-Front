import { Component, OnInit } from '@angular/core';
import { UserAdminRestService } from 'src/app/services/userAdminRest/user-admin-rest.service'
import { UserModel } from 'src/app/models/user.model';
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
  

  constructor(
    private userAdminRest: UserAdminRestService,
  ) { 
    this.user = new UserModel('', '', '', '', '', '', '', '' );
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userAdminRest.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.usersExist,
        console.log(this.users);
        
      },
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

  deleteUser(id: string) {
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
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
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
