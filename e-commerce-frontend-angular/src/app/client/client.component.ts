import { Component, OnInit } from '@angular/core';
import {Client} from '../model/client.model';
import {OrderService} from '../services/order.service';
import {AuthenticationService} from '../services/authentication.service';
import {CaddyService} from '../services/caddy.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  public mode: number = 0;
  // tslint:disable-next-line: no-inferrable-types
 public  panelStyle: string = 'panel-default';
  constructor(public orderService: OrderService,
              private authService: AuthenticationService,
              public caddyService: CaddyService,
              private router: Router) { }

  ngOnInit() {
  }

  onSaveClient(client: Client) {
    client.username = this.authService.authenticatedUser.username;
    this.orderService.setClient(client);
    this.caddyService.setClient(client);
    this.orderService.loadProductsFromCaddy();
    this.mode = 1;
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

  onPayOrder() {
    this.router.navigateByUrl('/payment/' + this.orderService.order.id);
  }
}
