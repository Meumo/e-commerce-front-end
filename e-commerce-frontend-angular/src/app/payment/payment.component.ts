import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../model/Order.model';
import {OrderService} from '../services/order.service';
import {Payment} from '../model/payment.model';
import {AuthenticationService} from '../services/authentication.service';
import {CaddyService} from '../services/caddy.service';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from '../services/catalogue.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentAmount: number;
  currentOrder: Order;
  public mode = 0;
  date: Date = new Date();
  public panelStyle = 'panel-default';
  public currentPayement: any;
  constructor(private router: Router, private route: ActivatedRoute,
              public orderService: OrderService,
              private authService: AuthenticationService,
              public caddyService: CaddyService,
              public httpClient: HttpClient,
              public catalService: CatalogueService) {}

  ngOnInit() {
    const id = this.route.snapshot.params.orderID;
    this.orderService.getOrder(id).subscribe(data => {
      this.currentOrder = data;
    }, err => {
      console.log(err);
    });
  }
  onOrder() {
    this.orderService.submitOrder().subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.orderService.order.id = data['id'];
      // tslint:disable-next-line: no-string-literal
      this.orderService.order.date = data['date'];
      this.panelStyle = 'panel-success';
    }, err => {
      console.log(err);
    });
  }
  onParOrder(dataForm: Payment) {
    console.log(dataForm);
    // dataForm.order=this.currentOrder;
    this.orderService.submitPayment(dataForm)
      .subscribe(data => {
        this.currentPayement = data;
        this.mode = 1;
        this.panelStyle = 'panel-success';
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
  onPayOrder() {
    this.httpClient.put(this.catalService.host + '/orders', this.currentPayement)
      .subscribe(data => {
        if(data==true)        
        this.router.navigateByUrl('/finish');
      }, err => {
        console.log(err);
      });

  }

  onImprime(){

  }
}
