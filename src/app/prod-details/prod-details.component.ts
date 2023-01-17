import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.css']
})
export class ProdDetailsComponent implements OnInit {
  currentUrl=this.router.url.split('/')[2];
constructor(public service:ProductService,private router: Router ){}
ngOnInit(){
  this.service.getPrductDetails(this.currentUrl)
}
changeBigImage(image:any){
  console.log(image)
}
}
