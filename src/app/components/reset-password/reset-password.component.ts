import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  private form = {
    email: null
  }
  constructor(private service:AuthService,private notify:SnotifyService,private spinner:Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }

  sendEmail()
  {
    this.spinner.show()
    this.service.resetPassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => {
        this.spinner.hide()
        this.notify.error(error.error.error,{
        position:SnotifyPosition.rightTop,
        timeout:3000,
        showProgressBar:false
      })
    }
    )
  }

  handleResponse(data)
  {
    this.spinner.hide()
    this.notify.success(data.data,{
      timeout:0,
      position:SnotifyPosition.rightTop,
      showProgressBar:false 
    })
    this.form.email = null;
  }
}
