import { Component, OnInit } from '@angular/core';
import{serviceHotelRestService} from 'src/app/services/serviceRest/services-rest.service';
import {ServiceModel} from 'src/app/models/services.model';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
//importancion del modelo del hotel


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any;
  service: ServiceModel;
  searchService: any;
  serviceUpdate: any; 
  serviceGetId: any;
  idHotel: any;
  hotelId:any;
  id: any
  //modelo del hotel
  constructor(
    private serviceRest: serviceHotelRestService,
    private activatedRoute: ActivatedRoute

    // private hotelRest: hotelRestService
  ) { 
    this.service = new ServiceModel('','','','',0);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idHotel = idRuta.get('idHotel');
    });
    this.getServices();
  
  }

  getServices(){
    this.serviceRest.getServices(this.idHotel).subscribe({
      next: (res:any)=> this.services = res.services,
      error: (err)=> console.log(err)
    })
  }

  getServiceByHotel(){
    this.serviceRest.getServiceByHotel(this.idHotel).subscribe({
      next: (res:any)=> this.services = res.services,
      error: (err)=> console.log(err)
    })
  }

  getService(id: string){
    this.serviceRest.getService(this.idHotel, id).subscribe({
      next: (res:any)=>{
        this.serviceGetId = res.checkServiceHotel
        console.log(this.serviceGetId);
        
      },
      error: (err)=> alert(err.error.message)
    })
  }

  
  
  addService(addServiceFrom: any){
    this.serviceRest.addService(this.idHotel, this.service).subscribe({
      next: (res: any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        
        this.getServices();
        addServiceFrom.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addServiceFrom.reset();
      },
    })
  }

  updateService(){
    this.serviceGetId.hotel= undefined;
    this.serviceRest.updateService(this.idHotel, this.serviceGetId._id, this.serviceGetId).subscribe({
      next: (res:any)=> {
        Swal.fire ({ icon: 'success', title: res.message,});
        console.log(this.serviceGetId);
        this.getServices();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  deleteService(id:string){
    Swal.fire({
      title: 'Are you sure to remove the service?',
      text: 'This action cannot be reversed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, I want to delete it',
      cancelButtonText: 'Cancell',
    }).then((result) => {
      if (result.isConfirmed) {
    this.serviceRest.deleteService(this.idHotel, id).subscribe({
      next: (res:any)=> {
        Swal.fire({
          title: res.message + ' ' + res.serviceDeleted.name,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        this.getServices();
      },
      error: (err)=> {Swal.fire({
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


}
