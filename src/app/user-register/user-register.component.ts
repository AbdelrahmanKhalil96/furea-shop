import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  constructor(private auth: AuthService) {}

  login() {
    this.auth.loginWithPopup({
      appState: {
        target: '/profile',
      },
    });  }
}
