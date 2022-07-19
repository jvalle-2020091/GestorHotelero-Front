import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationRestService } from 'src/app/services/reservationRest/reservation-rest.service'
import { Router } from '@angular/router';
import {InvoiceModel} from 'src/app/models/invoice.model'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoice: InvoiceModel;
  idReser: any;
  invoiceId: any;
  reservation: any;


  constructor(
    private reservationRest: ReservationRestService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.invoice = new InvoiceModel('','','','','','','');

   }

 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idReser = idRuta.get('idReser');
    });
   this.getInvoice();
  }

  getInvoice() {
    this.reservationRest.getInvoice(this.idReser).subscribe({
      next: (res: any) => {
        this.invoiceId = res.invoice;
        this.reservation = res.checkReservation;
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
