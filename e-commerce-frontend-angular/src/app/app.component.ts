import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './services/catalogue.service';
import { Router } from '@angular/router';
import { CaddyService } from './services/caddy.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories;
  currentCategorie;

  // tslint:disable-next-line: whitespace
  // tslint:disable-next-line: typedef-whitespace
  // tslint:disable-next-line: whitespace
  constructor(public catService: CatalogueService,
    // tslint:disable-next-line: align
    private router: Router,
    // tslint:disable-next-line: align
    public caddyService: CaddyService,
    // tslint:disable-next-line: whitespace
    // tslint:disable-next-line: align
    public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getCategories();
    this.authService.loadUser();
    // tslint:disable-next-line: whitespace
    // tslint:disable-next-line: curly
    if (this.authService.isAuthenticated())
      this.caddyService.loadCaddyFromLocalStorage();
  }

  private getCategories() {
    // tslint:disable-next-line: quotemark
    // tslint:disable-next-line: whitespace
    // tslint:disable-next-line: quotemark
    this.catService.getResource(this.catService.host + "/categories")
      .subscribe(data => {
        this.categories = data;
      }, err => {
        console.log(err);
      // tslint:disable-next-line: semicolon
      })
  }

  getProductsByCat(c) {
    this.currentCategorie = c;
    this.router.navigateByUrl('/products/2/' + c.id);
  }

  onSelectedProducts() {
    this.currentCategorie = undefined;
    // tslint:disable-next-line: quotemark
    this.router.navigateByUrl("/products/1/0");
  }

  onProductsPromo() {
    this.currentCategorie = undefined;
    // tslint:disable-next-line: quotemark
    this.router.navigateByUrl("/products/3/0");
  }

  onProductsDispo() {
    this.currentCategorie = undefined;
    // tslint:disable-next-line: quotemark
    this.router.navigateByUrl("/products/4/0");
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

  onLogout() {
    this.caddyService.emptyCaddy();
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
