import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginGuard implements CanActivate {
 
  constructor(public authService: TokenService,public router:Router){}
  
  canActivate()
  {
    if(!this.authService.loggedIn())
    {
      this.router.navigateByUrl('/login')
      return false;
    }
    return true;
  }
  
}
