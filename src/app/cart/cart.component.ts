import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user$ = this.authService.user$;
  constructor(public service:ProductService,private authService: AuthService){}
ngOnInit(){
 console.log(this.service.cart)
}
getitemTotalPrice(count: number,item: any){
return item.price * count
}
}
