import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
declare var $:any;
@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  private form = {
    email:null,
    password:null,
    password_confirmation:null,
    resetToken:null
  }
  private error = [];

  constructor(private route:ActivatedRoute,private service:AuthService,private router:Router,private notify:SnotifyService) {
    route.queryParams.subscribe(params=>{
      this.form.resetToken = params.token,
      this.form.email = params.email
    })
   }


  ngOnInit() {
    // this.form.email
  }

  reset()
  {
    this.service.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => {
        this.error = error.error.errors
        $("#success-alert").fadeTo(3000, 500).slideUp(500, function() {
          $("#success-alert").slideUp(500);
        });
      }
    )
  }

  handleResponse(data)
  {
    let _router = this.router;
    this.notify.confirm('Hecho! Ahora haz login con tu nueva contraseña',{
      position: SnotifyPosition.centerTop,
      buttons:[
        {text:'Ok',action: toster=>{
          _router.navigateByUrl('/login'),
          this.notify.remove(toster.id)
        }}
      ]
    })
  }

}
