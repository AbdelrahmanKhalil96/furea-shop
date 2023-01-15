import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

constructor(public service:ProductService){}
ngOnInit(){
this.service.getAllProducts();

}
addToCart(product: Product) {
  this.service.addToCart(product);
  window.alert('Your product has been added to the cart!');
}
}
