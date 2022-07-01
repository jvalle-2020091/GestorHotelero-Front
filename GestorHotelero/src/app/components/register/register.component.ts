import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserModel;
  repeatPass: String = ''
  timer: any = 0;

  constructor(
    private userRest: UserRestService, 
    private router: Router
  ) { 
    this.user = new UserModel('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
  }
  async checkPassword() {
    clearTimeout(this.timer);
    this.timer = await setTimeout(() => {
      if (this.repeatPass != this.user.password) {
        Swal.fire({
          icon: 'warning',
          title: 'Password doesnt match',
        });
        clearTimeout(this.timer);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Password match',
        });
        clearTimeout(this.timer);
      }
    }, 3000);
  }

  register() {
    this.userRest.register(this.user).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Already can login!',
        });
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

}
