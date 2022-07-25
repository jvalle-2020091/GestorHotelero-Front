import { Pipe, PipeTransform } from '@angular/core';
import { ReservationAdminAppComponent } from '../components/reservation/reservation-admin-app/reservation-admin-app.component';

@Pipe({
  name: 'users'
})
export class UsersPipe implements PipeTransform {

  transform(reservations: any, searchUser: any){
    if (searchUser == undefined) {
      return reservations;
    } else {
      return reservations.filter((reservation: any) => {
        return reservation.user.username.toLowerCase().includes(searchUser.toLowerCase());
      });
    }
  }
}
