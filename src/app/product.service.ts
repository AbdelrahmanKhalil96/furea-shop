import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
url:string="http://localhost:5000/ProdSpecified"
  products: Product[] = [];
  cart: Product[] = [];
  cartTotal:number=0;
  selectedId:number=0
  user$ = this.authService.user$;
  selectedProduct:Product[]=[];
  PrductDetail: Product[] = [];
  constructor(private http:HttpClient,public authService: AuthService) { }
  getAllProducts(){
    this.http.get(this.url).toPromise().then(
      res=>{
        this.products=res  as Product[];
      //  console.log(this.products);
      }
    )
  }
  getPrductDetails(id:any){
    this.http.get(this.url+"/"+id).toPromise().then(
      res=>{
        this.PrductDetail=res  as Product[];
      console.log(this.PrductDetail);
      }
    )
  }
  placeOrder(){
    console.log(this.cart)
  }
  changeProductQty(qty: number,product: Product){
    if(product.qty>0){
      if(qty>0){
        this.cartTotal+=product.price ;
      }
      else{
        this.cartTotal-=product.price ;

      }
      product.qty+=qty;
    this.cart[this.cart.indexOf(product)]=product
    }
    else if(product.qty==0&&qty>0){
      this.cartTotal+=product.price ;
      product.qty+=qty;
      this.cart[this.cart.indexOf(product)]=product


    }

  }
  addToCart(product: Product) {
    if(this.cart.includes(product)){
     // console.log(this.cart.indexOf(product))
product.qty+=1
//console.log(product)
this.cart[this.cart.indexOf(product)]=product
    }
    else
    {this.cart.push(product);
}    this.cartTotal+=product.price ;

   // console.log(this.cart);
  }
}
