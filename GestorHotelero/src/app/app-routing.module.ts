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


import { NotFoundComponent } from './components/not-found/not-found.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EventComponent } from './components/admin-HOTEL/event/event.component';
import { MyHotelComponent } from './components/admin-HOTEL/my-hotel/my-hotel.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  

  {path: 'hotels', component: HotelsComponent},
  {path: 'myProfile', component: MyProfileComponent},
  {path: 'users', component: UsersComponent},
  {path: 'reservation', component: ReservationUserComponent},
  {path: 'reservationAdminHotel', component: ReservationAdminHotelComponent},
  {path: 'reservationAdminApp', component: ReservationAdminAppComponent},
  {path: 'event/:idHotel', component: EventComponent},
  {path: 'myHotel', component:  MyHotelComponent },


  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
