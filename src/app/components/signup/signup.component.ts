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
  private form = {
    name: null,
    email:null,
    role_id:2,
    wallet:0,
    password:null,
    password_confirmation:null
  }
  private error = {
    'name': '',
    'email':'',
    'password':''
  };
  private errorToken:boolean = false;
  constructor(private service:AuthService, private token:TokenService,private router:Router,private auth:CheckService) { }

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
