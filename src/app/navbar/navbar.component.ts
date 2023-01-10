import { Component, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLogoutComponent } from '../user-logout/user-logout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isAuthenticated$ = this.authService.isAuthenticated$;
currentUrl=this.router.url;
/*   @Input() public user = {
    name: 'Izzat Nadiri',
    age: 26,
    link:''
    }
*/
  openLogoutModal() {
    //ModalComponent is component name where modal is declare
   const modalRef = this.modalService.open(UserLogoutComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });

 /*  const modalRef = this.modalService.open(UserLogoutComponent);
modalRef.componentInstance.user = this.user;*/
/*modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
console.log(receivedEntry);
})*/
  }
  constructor(private authService: AuthService,private router: Router ,public modalService: NgbModal) {}
}
