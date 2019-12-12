import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { CheckService } from 'src/app/services/check.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartProductService } from 'src/app/services/cart-product.service';
declare var $:any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user = null;
  private comprados = [];
  private datos:boolean;
  private compras:boolean;
  private edit:boolean = false;

  private form = {
    name:null,
    email:null,
    password:null,
    password_confirmation:null,
    current_password:null
  }
  private error = {
    'name': '',
    'email':'',
    'current_password':'',
    'password':''
  };
  constructor(private token:TokenService,private notify:SnotifyService,private auth:CheckService,private router:Router,private ruta:ActivatedRoute,private service:AuthService,private cart:CartProductService) {
    let longitud:any = this.ruta.url;
    if(longitud.value.length > 1)
    {
      this.compras = true;
      this.datos = false;
      this.listarCompras()
    }else{
      this.datos = true;
      this.compras = false;
    }
   }

  ngOnInit() {
    this.user = JSON.parse(this.token.getUser());
    
  }

  negar()
  {
    this.edit = !this.edit;
  }

  update()
  {
    this.form.email = this.user.email;
    this.service.update(this.form,this.user.id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleError(error)
  {
    this.error = error.error.errors
    window.setTimeout(function(){
      $(".success-alert").fadeTo(3000, 500).slideUp(500)
    },1000)
  }

  handleResponse(data)
  {
    
    this.negar()
    if(data)
    {
      this.token.setUser(data.user);
      this.notify.success("Actualizando Datos...",{
        position:SnotifyPosition.rightTop,
        timeout:2000,
        showProgressBar:true
      })
      window.setTimeout(function(){
        location.reload()
      },2000)
    }else{
      this.notify.info("Sin modificar",{
        timeout:4000,
        position:SnotifyPosition.rightTop,
        showProgressBar:false
      })
      window.setTimeout(function(){
        location.reload()
      },3000)
    }
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

  listarCompras()
  {
    this.cart.consultarCompras().subscribe(
      data => this.handleResponseCompras(data),
      error => console.error(error)
    
    );
  }

  handleResponseCompras(data)
  {
      this.comprados = data
      //  console.log(this.comprados);   
  }

}
