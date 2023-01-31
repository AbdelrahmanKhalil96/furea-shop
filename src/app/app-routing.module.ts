import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { MainPageComponent } from './main-page/main-page.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProdDetailsComponent } from './prod-details/prod-details.component';
import { ShopComponent } from './shop/shop.component';
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
    path: 'about',
    component:AboutComponent,
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component:ContactComponent,
    pathMatch: 'full'
  },
  {
    path: 'my-cart',
    component:CartComponent,
    pathMatch: 'full'
  },
  {
    path: 'All-Products',
    component:ShopComponent,
    pathMatch: 'full'
  },
  {
    path: 'All-Products/:id',
    component:ProdDetailsComponent,
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
  {
    path: 'user-orders/:id',
    component:OrderDetailsComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
