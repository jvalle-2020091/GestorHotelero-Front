import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/admin-APP/users/users.component'
import { ReservationUserComponent } from './components/reservation/reservation-user/reservation-user.component';
import { ReservationAdminHotelComponent } from './components/reservation/reservation-admin-hotel/reservation-admin-hotel.component';
import { ReservationAdminAppComponent } from './components/reservation/reservation-admin-app/reservation-admin-app.component';
import { ServicesComponent } from './components/admin-HOTEL/services/services.component';
import { RoomsComponent } from './components/admin-HOTEL/rooms/rooms.component';


import { NotFoundComponent } from './components/not-found/not-found.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EventComponent } from './components/admin-HOTEL/event/event.component';
import { MyHotelComponent } from './components/admin-HOTEL/my-hotel/my-hotel.component';
import { InvoiceComponent } from './components/admin-HOTEL/invoice/invoice.component';
import { UserGuard } from './guards/user.guard';
import { AdminHotelGuard } from './guards/admin-hotel.guard';
import { AdminAppGuard } from './guards/admin-app.guard'


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'hotels', component: HotelsComponent},
  {path: 'myProfile', component: MyProfileComponent},

  {path: 'users', canActivate:[AdminAppGuard], component: UsersComponent},
  {path: 'reservation/:idHotel', canActivate:[UserGuard], component: ReservationUserComponent},
  {path: 'reservationAdminHotel/:idHotel', canActivate:[AdminHotelGuard], component: ReservationAdminHotelComponent},
  {path: 'reservationAdminApp',  canActivate:[AdminAppGuard], component: ReservationAdminAppComponent},
  {path: 'event/:idHotel', component: EventComponent},
  {path: 'myHotel', canActivate:[AdminHotelGuard], component:  MyHotelComponent },
  {path: 'service/:idHotel', canActivate:[AdminHotelGuard], component: ServicesComponent },
  {path: 'rooms/:idHotel', canActivate:[AdminHotelGuard], component: RoomsComponent},
  {path: 'invoice/:idReser',  canActivate:[UserGuard], component: InvoiceComponent},

  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
