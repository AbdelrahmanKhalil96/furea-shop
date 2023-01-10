import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  constructor(private auth: AuthService) {}
  login() {
    this.auth.loginWithRedirect({
      appState: {
        target: '/profile',
      },
    });  }
}
