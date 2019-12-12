import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CheckService } from 'src/app/services/check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
declare var $: any;


@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  private loggedIn:boolean;
  private id_cart;

  constructor(private token:TokenService,private router:Router,private auth:CheckService,private spinner:Ng4LoadingSpinnerService,private notify:SnotifyService) { }

  ngOnInit() {
    $(document).ready(function(){
      (<any>$('.sidenav')).sidenav()
    });
    this.auth.authStatus.subscribe(
      value =>{
        this.loggedIn = value
        if(this.loggedIn)
        {
          this.id_cart = JSON.parse(this.token.getCart()).id
        }
      } 
    );
  }


  logout(event:MouseEvent)
  {
    this.notify.success("Hasta luego " + JSON.parse(this.token.getUser()).name,{
      position:SnotifyPosition.rightTop,
      timeout:3000,
      showProgressBar:false
    }) 
    event.preventDefault();
    this.token.remove();
    this.auth.changeAuthStatus(false)
    this.router.navigateByUrl('/login');
  }
}
