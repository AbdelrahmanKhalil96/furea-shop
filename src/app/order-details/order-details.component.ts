import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  currentUrl=this.router.url.split('/')[2];
  ngOnInit(){
    console.log(this.currentUrl)
    this.service.getOrderDetails({"Id":parseInt(this.currentUrl)})

  }
constructor(private authService: AuthService, public service:ProductService,private router: Router ){}
}
