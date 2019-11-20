import {ItemProduct} from '../model/item-product.model';
import {Injectable} from '@angular/core';
import {Product} from '../model/product.model';
import {AuthenticationService} from './authentication.service';
import {Caddy} from '../model/caddy.model';
import {Client} from '../model/client.model';
@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  public currentCaddyName = 'Caddy1';
  public listCaddies: Array<{num: number, name: string}> = [{num: 1, name: 'Caddy1'}];
  public caddies: Map<string, Caddy> = new Map();
  constructor(private authService: AuthenticationService) {
    if (this.authService.isAuthenticated()) {
      this.loadCaddyFromLocalStorage();
    } else {
      this.caddies[this.currentCaddyName] = new Caddy(this.currentCaddyName);
    }
  }

  public addProductToCaddy(id: number, name: string, price: number, quantity: number): void {
    const caddy = this.caddies[this.currentCaddyName];
    let item = caddy.items[id];
    if (item === undefined) {
      item = new ItemProduct(); item.id = id; item.name = name;
      item.price = price; item.quantity = quantity;
      caddy.items[id] = item;
    } else {
      item.quantity += quantity;
    }
  }
  public removeProduct(id: number): void {
    const caddy = this.caddies[this.currentCaddyName];
    delete caddy.items[id];
    this.saveCaddy();
  }
  public addProduct(product: Product) {
    this.addProductToCaddy(product.id, product.name, product.currentPrice, product.quantity);
    this.saveCaddy();
  }
  public loadCaddyFromLocalStorage() {
    const myCaddiesList = localStorage.getItem('ListCaddies_' + this.authService.authenticatedUser.username);
    // tslint:disable-next-line: triple-equals
    this.listCaddies = myCaddiesList == undefined ? [{num: 1, name: 'Caddy1'}] : JSON.parse(myCaddiesList);
    this.listCaddies.forEach(c => {
      const cad = localStorage.getItem('myCaddy_' + this.authService.authenticatedUser.username + '_' + c.name);
      // tslint:disable-next-line: triple-equals
      this.caddies[c.name] = cad == undefined ? new Caddy(c.name) : JSON.parse(cad);
    });
  }
  public getCaddy(): Caddy {
    const caddy = this.caddies[this.currentCaddyName];
    return caddy;
  }

  saveCaddy() {
    const caddy = this.caddies[this.currentCaddyName];
    localStorage.setItem('myCaddy_' + this.authService.authenticatedUser.username + '_' + this.currentCaddyName, JSON.stringify(caddy));
  }

  getSize() {
    const caddy = this.caddies[this.currentCaddyName];
    return Object.keys(caddy.items).length;
  }

  emptyCaddy() {
    this.caddies = new Map();
    this.listCaddies = [];
  }

  getTotalCurrentCaddy() {
    const caddy = this.caddies[this.currentCaddyName];
    let total = 0;
    // tslint:disable-next-line: forin
    for (const key in caddy.items) {
      total += caddy.items[key].price * caddy.items[key].quantity;
    }
    return total;
  }

  addNewCaddy(c: {num: number; name: string}) {
    this.listCaddies.push(c);
    this.caddies[c.name] = new Caddy(c.name);
    localStorage.setItem('ListCaddies_' + this.authService.authenticatedUser.username, JSON.stringify(this.listCaddies));
  }

  setClient(client: Client) {
    this.getCaddy().client = client;
    this.saveCaddy();
  }
}
