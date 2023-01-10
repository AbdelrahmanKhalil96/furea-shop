import { Component, Inject , EventEmitter, Output,OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class UserLogoutComponent{

  constructor(private activeModal: NgbActiveModal, private router: Router , private auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,) {}
    public href: string = "";
  @Output() logout = new EventEmitter<string>();


  closeModal() {
    this.activeModal.close('Modal Closed');
  }
  handleLogout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
  ngOnInit() {
  this.href = this.router.url;
    this.logout.emit(this.href);

}
}
