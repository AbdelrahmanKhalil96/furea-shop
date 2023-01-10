import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  {
    path: '',
 //   redirectTo: '',
 component:MainPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:UserLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component:UserRegisterComponent,
    pathMatch: 'full'
  },

  {
    path: 'logout',
    component:UserLogoutComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component:UserProfileComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
