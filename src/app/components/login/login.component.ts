import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { CheckService } from 'src/app/services/check.service';
import { Router } from '@angular/router';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form:any = {
    email: null,
    password:null
  }
  public error:any = null;
  public errorToken:boolean = false;
  
  constructor(public service:AuthService,public token:TokenService,public auth:CheckService,public router:Router,public notify:SnotifyService,
              public spinner:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    
  }

  login()
  {
    this.spinner.show()
    this.service.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }


  handleResponse(data)
  {
    this.spinner.hide()
    this.token.handle(data);
      if(this.token.loggedIn())
      {
        this.auth.changeAuthStatus(true);
      }else{
        this.errorToken = true;
      }
      this.notify.success('Bienvenido '+JSON.parse(this.token.getUser()).name,{
        timeout:2000,
        position:SnotifyPosition.rightTop,
        showProgressBar:false
      })
      this.router.navigateByUrl('/stores');
  }

  handleError(error)
  {
    this.spinner.hide()
    this.error = error.error.error    
    if(!this.error)
    {
      this.error = "Ocurrio un error inesperado";
    } 
    $("#success-alert").fadeTo(3000, 500).slideUp(500, function() {
      $("#success-alert").slideUp(500);
    });
  }
}
