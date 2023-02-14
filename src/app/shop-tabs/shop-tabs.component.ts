import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-shop-tabs',
  templateUrl: './shop-tabs.component.html',
  styleUrls: ['./shop-tabs.component.css']
})
export class ShopTabsComponent implements OnInit {
  constructor(public service:ProductService){}
  chairs:any=[]
  sofas:any=[]
  lamps:any=[]
  tables:any=[]
  monitors:any=[]

  ngOnInit(){
             this.service.getAllProducts();
 setTimeout(() => {
this.service.products.forEach(product=>{
  if(product.categoryName=='chairs'){
    this.chairs.push(product);
  }
  else if(product.categoryName=='sofas'){
    this.sofas.push(product);
  }
  else if(product.categoryName=='lamps'){
    this.lamps.push(product);
  }
  else if(product.categoryName=='tables'){
    this.tables.push(product);
  }
  else if(product.categoryName=='monitors'){
    this.monitors.push(product);
  }
})
    }, 500);

    }
}
