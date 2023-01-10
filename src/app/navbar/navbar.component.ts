import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLogoutComponent } from '../user-logout/user-logout.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isAuthenticated$ = this.authService.isAuthenticated$;

  openLogoutModal() {
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(UserLogoutComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  constructor(private authService: AuthService,public modalService: NgbModal) {}
}
