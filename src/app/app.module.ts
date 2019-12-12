import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TiendaComponent } from './components/tienda/tienda.component';

import { AuthService } from './services/auth.service'
import { HttpClientModule } from '@angular/common/http';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { ProductStoreComponent } from './components/product-store/product-store.component'

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { CheckService } from './services/check.service';
import { ProductsService } from './services/products.service';
import { TokenService } from './services/token.service';
import { ProductsCartComponent } from './components/products-cart/products-cart.component';
import { ProfileComponent } from './components/profile/profile.component';

import {TimeAgoPipe} from 'time-ago-pipe';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TiendaComponent,
    NavegacionComponent,
    ProductStoreComponent,
    ProductsCartComponent,
    ProfileComponent,
    TimeAgoPipe,
    ResetPasswordComponent,
    ResponseResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SnotifyModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule
  ],
  providers: [
    AuthService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    CheckService,
    ProductsService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
