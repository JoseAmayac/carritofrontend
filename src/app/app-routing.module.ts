import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { BeforeLoginGuard } from './guards/before-login.guard';
import { AfterLoginGuard } from './guards/after-login.guard';
import { ProductStoreComponent } from './components/product-store/product-store.component';
import { ProductsCartComponent } from './components/products-cart/products-cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';


const routes: Routes = [
  {
    path:'signup',
    component:SignupComponent,
    canActivate:[BeforeLoginGuard]
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[BeforeLoginGuard]
  },
  {
    path:'stores',
    component:TiendaComponent,
    canActivate:[AfterLoginGuard]
  },
  {
    path:'stores/:id',
    component: ProductStoreComponent,
    canActivate: [AfterLoginGuard]
  },
  {
    path:'productCart/:id',
    component: ProductsCartComponent,
    canActivate:[AfterLoginGuard]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AfterLoginGuard]
  },
  {
    path:'profile/compras',
    component:ProfileComponent,
    canActivate:[AfterLoginGuard]
  },
  {
    path:'reset-password',
    component:ResetPasswordComponent,
    canActivate: [BeforeLoginGuard]
  },
  {
    path:'response-reset',
    component:ResponseResetComponent,
    canActivate:[BeforeLoginGuard]
  },
  {
    path:'',
    component:TiendaComponent,
    canActivate:[AfterLoginGuard],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
