import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { CheckService } from 'src/app/services/check.service';
declare var $:any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form:any = {
    name: null,
    email:null,
    role_id:2,
    wallet:0,
    password:null,
    password_confirmation:null
  }
  public error:any = {
    'name': '',
    'email':'',
    'password':''
  };
  public errorToken:boolean = false;
  constructor(public service:AuthService, public token:TokenService,public router:Router,public auth:CheckService) { }

  ngOnInit() {
  }


  register()
  {
    this.service.signup(this.form).subscribe(
      data =>  this.handleResponse(data),
      error => this.handleError(error),
    )
  }

  handleResponse(data)
  {
      this.token.handle(data);
      if(this.token.loggedIn())
      {
        this.auth.changeAuthStatus(true);
      }else{
        this.errorToken = true;
      }
      this.router.navigateByUrl('/stores');
  }

  handleError(error)
  {
    this.error = error.error.errors;
    window.setTimeout(function(){
      $(".success-alert").fadeTo(3000, 500).slideUp(500)
    },1000)
  }
}
