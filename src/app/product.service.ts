import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
url:string="http://localhost:5000/ProdSpecified"
  products: Product[] = [];
  constructor(private http:HttpClient) { }
  getAllProducts(){
    this.http.get(this.url).toPromise().then(
      res=>{
        this.products=res  as Product[];
        console.log(this.products);

      }
    )
  }
}
