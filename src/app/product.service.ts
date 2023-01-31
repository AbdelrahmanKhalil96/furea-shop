import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'http://localhost:5000/';
  products: Product[] = [];
  cart: Product[] = [];
  cartTotal: number = 0;
  selectedId: number = 0;
  user$ = this.authService.user$;
  selectedProduct: Product[] = [];
  PrductDetail: Product[] = [];
  bigImage = '';
  placed = false;
  loggedUser: any = {};
  errors='';

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private router: Router
  ) {}
  getAllProducts() {
    this.http
      .get(this.url + 'ProdSpecified')
      .toPromise()
      .then((res) => {
        this.products = res as Product[];
        this.errors=''
        //  console.log(this.products);
      }).catch((err)=>{
        this.errors="Database Error";
        console.log(err);
      });
  }
  checkForUser(user: any) {
    console.log(user.email);
  }
  getPrductDetails(id: any) {
    this.http
      .get(this.url + 'ProdSpecified/' + id)
      .toPromise()
      .then((res) => {
        this.PrductDetail = res as Product[];
        console.log(this.PrductDetail);
        this.bigImage = this.PrductDetail[0].image;
        this.errors=''

      }).catch((err)=>{
        this.errors="Database Error";
        console.log(err);
      });
  }
  removeItem(item: Product) {
    const index = this.cart.indexOf(item);
    if (index > -1) {
      // only splice array when item is found
      this.cartTotal -= item.price * item.qty;
      this.cart.splice(index, 1); // 2nd parameter means remove one item only
      console.log(this.cart);
    }
  }
  printuser(us: string) {
    try {
      // let num = JSON.parse(us).sub.split('|')[1].slice(-5);
      let jsonData = JSON.parse(us);
      let postedData: any = {};
      postedData['name'] = jsonData.name;
      postedData['image'] = jsonData.picture;
      postedData['email'] = jsonData.email;
      postedData['id'] = Number(jsonData.sub.split('|')[1].slice(-5));
      //console.log(postedData);
      this.loggedUser = postedData;

      this.http
        .post(this.url + 'CheckForUser', postedData)
        .toPromise()
        .then((res) => {
          //  this.products=res  as Product[];
          console.log(res);
          this.errors=''

        })
        .catch((err) => {
          if (err.status == 404) {
            console.log('user Created');
            this.errors=''

          } else if (err.status == 400) {
            console.log('user Data Error');
            this.errors=''

          }
          else{


            this.errors="Database Error";
            console.log(err);

          }
        });
    } catch {
      console.log('unknown Error');
    }
  }
  placeOrder() {
    // console.log(this.loggedUser.id)
    //
    // console.log(this.cart)
    if (this.cart.length > 0 && this.loggedUser.id != null) {
      this.http
        .post(this.url + 'ProcessOrder', {
          userId: this.loggedUser.id,
          products: this.cart,
        })
        .toPromise()
        .then((res: any) => {
          //  this.products=res  as Product[];
          if (res.order.id > 0) {
            this.cart = [];
            this.cartTotal = 0;
            console.log('Order Placed');
             this.placed = true;
              console.log( this.placed )
              this.errors=""
               setTimeout(() => {

            }, 100);
            setTimeout(() => {
              this.placed = false;
              console.log( this.placed )

              // this.router.navigate(['/profile'])
            }, 1000);
            setTimeout(() => {
              this.router.navigate(['/profile'])
            }, 1000);
          }
          console.log(res.order.id);
        })
        .catch((err) => {
          if (err.status == 404) {
            this.errors="404 Not Found"
            console.log('404 Not Found');
          } else if (err.status == 400) {
            console.log('Bad Request');
            this.errors="Bad Request"

          }
        });
    } else {
      console.log('Bad Data');
      this.errors="Bad Data"

    }
  }
  changeProductQty(qty: number, product: Product) {
    if (product.qty > 0) {
      if (qty > 0) {
        this.cartTotal += product.price;
      } else {
        this.cartTotal -= product.price;
      }
      product.qty += qty;
      this.cart[this.cart.indexOf(product)] = product;
    } else if (product.qty == 0 && qty > 0) {
      this.cartTotal += product.price;
      product.qty += qty;
      this.cart[this.cart.indexOf(product)] = product;
    }
  }
  addToCart(product: Product) {
    if (this.cart.includes(product)) {
      // console.log(this.cart.indexOf(product))
      product.qty += 1;
      //console.log(product)
      this.cart[this.cart.indexOf(product)] = product;
    } else {
      this.cart.push(product);
    }
    this.cartTotal += product.price;

    // console.log(this.cart);
  }
}
