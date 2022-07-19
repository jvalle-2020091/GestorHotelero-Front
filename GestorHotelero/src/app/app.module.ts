import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';



import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { UsersComponent } from './components/admin-APP/users/users.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ReservationAdminAppComponent } from './components/reservation/reservation-admin-app/reservation-admin-app.component';
import { ReservationAdminHotelComponent } from './components/reservation/reservation-admin-hotel/reservation-admin-hotel.component';
import { ReservationUserComponent } from './components/reservation/reservation-user/reservation-user.component';
import { EventComponent } from './components/admin-HOTEL/event/event.component';
import { MyHotelComponent } from './components/admin-HOTEL/my-hotel/my-hotel.component';
import { ServicesComponent } from './components/admin-HOTEL/services/services.component';
import { RoomsComponent } from './components/admin-HOTEL/rooms/rooms.component';
import { InvoiceComponent } from './components/admin-HOTEL/invoice/invoice.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HotelsComponent,
    UsersComponent,
    MyProfileComponent,
    ReservationAdminAppComponent,
    ReservationAdminHotelComponent,
    ReservationUserComponent,
    EventComponent,
    MyHotelComponent,
    ServicesComponent,
    RoomsComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
