import { Component, OnInit } from '@angular/core';
import { UserAdminRestService } from 'src/app/services/userAdminRest/user-admin-rest.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(
    private userAdminRest: UserAdminRestService,
  ) { }

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
}
