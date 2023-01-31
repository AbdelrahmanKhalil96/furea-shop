import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  title = 'Decoded ID Token';
  user$ = this.authService.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));
  @ViewChild('myDiv',{static:false})
  myDiv!: ElementRef<HTMLElement>;

triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement;
    el.click();
}

ngOnInit(){

 setTimeout(() => {
      this.triggerFalseClick();
      this.service.getuserOrders();

  },);
}
  constructor(private authService: AuthService, public service:ProductService ) {}

}
