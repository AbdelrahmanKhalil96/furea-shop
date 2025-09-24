import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuth0Loading$ = this.authService.isLoading$;
    title = 'furea-shop';
    version='1.0.0'
  constructor(private authService: AuthService) {}}
