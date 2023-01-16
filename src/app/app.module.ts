import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from './slider/slider.component';
import { CollectionComponent } from './collection/collection.component';
import { ShopTabsComponent } from './shop-tabs/shop-tabs.component';
import { FooterComponent } from './footer/footer.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AuthModule } from '@auth0/auth0-angular';
import { MainPageComponent } from './main-page/main-page.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { HttpClientModule } from '@angular/common/http';
import { ProdDetailsComponent } from './prod-details/prod-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    CollectionComponent,
    ShopTabsComponent,
    FooterComponent,
    UserLoginComponent,
    UserProfileComponent,
    UserRegisterComponent,
    MainPageComponent,
    PageLoaderComponent,
    UserLogoutComponent,
    AboutComponent,
    ContactComponent,
    CartComponent,
    ShopComponent,
    ProdDetailsComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: 'dev-yrx65ucljm0n3jzg.us.auth0.com',
      clientId: 'kojDK0wosJzLUhZA5VGIxSPO3HB2JEmr'
    }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
