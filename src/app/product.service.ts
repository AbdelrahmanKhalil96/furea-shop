import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  admin=false
  url: string = 'http://localhost:5000/';
  products: Product[] = [];
  cart: Product[] = [];
  cartTotal: number = 0;
  selectedId: number = 0;
  user$ = this.authService.user$;
  userOrders: any = [];
  orderDetails: any = [];
  selectedProduct: Product[] = [];
  PrductDetail: Product[] = [];
  bigImage = '';
  placed = false;
  loggedUser: any = {};
  errors = '';
  selectedAdminEdit: any = {};
  selectedUserEdit: any = {};
  selectedProductEdit: any = {};
  newProduct:any={};
  allUsers:any={}

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private router: Router
  ) {}
getallUsersAdmin(){
  this.http
          .get(this.url + 'api/users/')
          .toPromise()
          .then((res) => {
           this.allUsers=res
            this.errors = '';
            console.log(this.allUsers)
          })
          .catch((err) => {
            this.errors = 'Database Error';
            console.log(err);
          });
}
getEditedProductDetails(id:any){

  this.selectedProductEdit=this.products.find(x => x.id == id)
  console.log(this.selectedProductEdit)
}
  saveEditedOrder(orderItems: any, order: any) {
    console.log('order is' + JSON.stringify(order));
    console.log('orderItems is' + JSON.stringify(orderItems));
    var sentOrder: any = {};
    sentOrder.id = order.id;
    sentOrder.totalAmount = 0;
    sentOrder.userId=order.userId;
    sentOrder.orderDate=order.orderDate;

    if (orderItems.length > 0) {
      sentOrder.orderStatus = orderItems[0].orderStatus;
      orderItems.forEach((item: any) => {
        var sentItem: any = {};
        sentItem.id = item.id;
        sentItem.orderId = order.id;
        sentItem.noPieces = item.qty;
        sentItem.total = item.productSum;
        sentItem.productId = item.productId;
        sentOrder.totalAmount = sentOrder.totalAmount + sentItem.total;
        this.http
          .put(this.url + 'api/OrderItems/' + item.id, sentItem)
          .toPromise()
          .then((res) => {
            if (res == null) {
            }
            this.errors = '';
            console.log(res);
          })
          .catch((err) => {
            this.errors = 'Database Error';
            console.log(err);
          });
      });
    }
    console.log(sentOrder)
    this.http
      .put(this.url + 'api/Orders/' + sentOrder.id, sentOrder)
      .toPromise()
      .then((res) => {
        this.errors = '';
        console.log(res);
        if(res==null){
          this.getAdminusersOrders();
        }
      })
      .catch((err) => {
        this.errors = 'Database Error';
        console.log(err);
      });
  }
  addNewProduct(){

    this.http
    .post(this.url + 'api/Products'  , this.newProduct)
    .toPromise()
    .then((res) => {
      this.errors = '';
      console.log(res);
      if(res!=null){
        this.getAllProducts();
      }
    })
    .catch((err) => {
      this.errors = 'Database Error';
      console.log(err);
    });

  }
  getAllProducts() {
    this.http
      .get(this.url + 'ProdSpecified')
      .toPromise()
      .then((res) => {
        this.products = res as Product[];
        this.errors = '';
         console.log(this.products);
      })
      .catch((err) => {
        this.errors = 'Database Error';
        console.log(err);
      });
  }
  checkForUser(user: any) {
    console.log(user.email);
  }
  getuserOrders() {
    this.http
      .post(this.url + 'GetUserOrders', this.loggedUser)
      .toPromise()
      .then((res) => {
        this.userOrders = res;
        this.errors = '';
        console.log(this.userOrders);
      })
      .catch((err) => {
        this.errors = 'Database Error';
        console.log(err);
      });
  }
  getAdminusersOrders() {
    this.http
      .get(this.url + 'GetAllOrders')
      .toPromise()
      .then((res) => {
        this.userOrders = res;
        this.errors = '';
        console.log(this.userOrders);
      })
      .catch((err) => {
        this.errors = 'Database Error';
        console.log(err);
      });
  }
  deleteProduct(ProdId: any) {
    this.http
      .delete(this.url + 'api/Products/' + parseInt(ProdId))
      .toPromise()
      .then((res) => {
        this.errors = '';
        console.log(res);
        this.getAllProducts();
      })
      .catch((err) => {
        this.errors = 'Database Error';
        console.log(err);
      });
  }
  deleteOrder(orderID: any) {
    this.http
      .delete(this.url + 'api/Orders/' + parseInt(orderID))
      .toPromise()
      .then((res) => {
        this.errors = '';
        console.log(res);
        this.getAdminusersOrders();
      })
      .catch((err) => {
        this.errors = 'Database Error';
        console.log(err);
      });
  }
  saveEditedProduct(){
    //console.log(this.selectedProductEdit)

    this.http
    .put(this.url + 'api/Products/' + this.selectedProductEdit.id, this.selectedProductEdit)
    .toPromise()
    .then((res) => {
      this.errors = '';
      console.log(res);
      if(res==null){
        this.getAllProducts();
      }
    })
    .catch((err) => {
      this.errors = 'Database Error';
      console.log(err);
    });
  }
  saveEditedUser(){
    this.http
    .put(this.url + 'api/users/' + this.selectedUserEdit.id, this.selectedUserEdit)
    .toPromise()
    .then((res) => {
      this.errors = '';
      console.log(res);
      if(res==null){
        this.getallUsersAdmin();
      }
    })
    .catch((err) => {
      this.errors = 'Database Error';
      console.log(err);
    });
  }
  getOrderDetails(id: any) {
    this.http
      .post(this.url + 'GetOrderDetails', id)
      .toPromise()
      .then((res) => {
        this.orderDetails = res;
        this.errors = '';
        console.log(this.orderDetails);
      })
      .catch((err) => {
        this.errors = 'Database Error';
        console.log(err);
      });
  }

  getPrductDetails(id: any) {
    this.http
      .get(this.url + 'ProdSpecified/' + id)
      .toPromise()
      .then((res) => {
        this.PrductDetail = res as Product[];
        console.log(this.PrductDetail);
        this.bigImage = this.PrductDetail[0].image;
        this.errors = '';
      })
      .catch((err) => {
        this.errors = 'Database Error';
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
      postedData['id'] = parseInt(jsonData.sub.split('|')[1].slice(-5), 16);
      postedData['title']
      //console.log(parseInt(jsonData.sub.split('|')[1].slice(-5),16));
      this.loggedUser = postedData;

      this.http
        .post(this.url + 'CheckForUser', postedData)
        .toPromise()
        .then((res) => {
          //  this.products=res  as Product[];
          console.log(res);

          this.http
        .get(this.url + 'api/users/'+this.loggedUser.id)
        .toPromise()
        .then((res: any) => {
          //  this.products=res  as Product[];
          console.log(res);
          this.loggedUser.title=res.title
          console.log("Logged Is "+this.loggedUser.title);
          if(this.loggedUser.title=='Admin'){
            this.admin=true
          this.errors = '';}
        else{
          this.admin=false
        }
        })
        .catch((err) => {
          if (err.status == 404) {
            console.log('user not found');
            this.errors = '';
          }
        });
          console.log("Logged Is "+this.loggedUser.title);

          this.errors = '';
        })
        .catch((err) => {
          if (err.status == 404) {
            console.log('user Created');
            this.errors = '';
          } else if (err.status == 400) {
            console.log('user Data Error');
            this.errors = '';
          } else {
            this.errors = 'Database Error';
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
    var finalCart:any=[]
   this.cart.forEach((product:Product)=>{
if(product.qty!=0){
  finalCart.push(product)
}
})
 if (finalCart.length > 0 && this.loggedUser.id != null) {

console.log(finalCart)
this.http
        .post(this.url + 'ProcessOrder', {
          userId: this.loggedUser.id,
          products:finalCart,
        })
        .toPromise()
        .then((res: any) => {
          //  this.products=res  as Product[];
          if (res.order.id > 0) {
            this.cart = [];
            this.cartTotal = 0;
            console.log('Order Placed');
            this.placed = true;
            console.log(this.placed);
            this.errors = '';
            setTimeout(() => {}, 200);
            setTimeout(() => {
              this.placed = false;
              console.log(this.placed);

              // this.router.navigate(['/profile'])
            }, 1000);
            setTimeout(() => {
              this.router.navigate(['/profile']);
            }, 1000);
          }
          console.log(res.order.id);
        })
        .catch((err) => {
          if (err.status == 404) {
            this.errors = '404 Not Found';
            console.log('404 Not Found');
          } else if (err.status == 400) {
            console.log('Bad Request');
            this.errors = 'Bad Request';
          }
        });
    } else {
      console.log('Bad Data');
      this.errors = 'Bad Data';
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
