import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CartProductService } from 'src/app/services/cart-product.service';
declare var $:any;
import Swal from 'sweetalert2'
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.css']
})
export class ProductsCartComponent implements OnInit {
  public productsCart:any =[];
  public total:number = 0;
  public vacio:any = "";
  public cantidades:any= [];
  public cart_id:any;
  constructor(public cart:CartProductService,public notify:SnotifyService,public spinner:Ng4LoadingSpinnerService,public router:Router) { }

  ngOnInit() 
  {
    this.cart_id= this
    for (let i = 0; i < 4; i++)
    {
      this.cantidades[i]=i+1;
    }
    this.cart.listProducts().subscribe(
      data =>  this.handleResponse(data),
      error => console.error(error)
    )
  }

  modalSwal(id)
  {
    Swal.fire({
      title: 'Está seguro?',
      text: "Este producto se eliminará de tu carrito de compras!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'Sí, eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.cart.removeProduct(id).subscribe(
          data => this.handleResponseRemoved(data),
          error => console.error(error)
        )
      }
    })
  }
 
  handleResponseRemoved(data)
  {
    
    if(!data.message)
    {
      this.productsCart = data
      this.total = 0;
      $(document).ready(function(){
        $('select').formSelect();
      });
      this.calcularValorTotal(data)
    }else{
      this.productsCart = data
      this.total = 0;
      this.vacio = data.message
    }
    this.spinner.hide()
    this.notify.warning("Producto eliminado de tu carrito",{
      position:SnotifyPosition.rightTop,
      showProgressBar:false,
      timeout:4000
    });
  }

  handleResponse(data)
  {
    
    this.productsCart = data
    $(document).ready(function(){
      $('select').formSelect();
    });
    if(!data.message)
    {
      
      this.productsCart =  data
      this.calcularValorTotal(data)
    }else{
      this.productsCart = data
      this.total = 0
      this.vacio = data.message
    }
      
  }

  calcularValorTotal(data)
  {
    for (let i = 0; i < data.productsCart.length; i++) {
      let precio:number = parseFloat(data.productsCart[i].precio_total); 
      this.total += precio
    }
  }

  update(id,productCart_id)
  {    
    var selectes = document.getElementsByClassName("select");
    for (let i = 0; i < selectes.length; i++) {
      if(selectes[i].getAttribute("name") == id)
      {
        let valor = selectes[i] as HTMLInputElement
        let valor_final = valor.value;
        this.cart.updateProduct(productCart_id,valor_final).subscribe(
           data => this.handleResponseUpdate(data),
           error =>  console.error(error)
        )
      }
    }
  }

  handleResponseUpdate(data)
  {
    this.productsCart = data
    this.total = 0;
    $(document).ready(function(){
      $('select').formSelect();
    });
    this.calcularValorTotal(data)
  }

  realizarCompra()
  {
    Swal.fire({
      title: 'Seguro?',
      text: "El total será cargado a tu cuenta!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, comprar!',
      cancelButtonText:'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.cart.realizarCompra().subscribe(
          data => this.handleResponseBuy(data),
          error => console.error(error) 
        )  
      }
    })
  }

  handleResponseBuy(data)
  {
    let timerInterval
    Swal.fire({
      title: data.message,
      html: 'Te vamos a redirigir a la página de tiendas!',
      timer: 4000,
      icon: "success",
      timerProgressBar: true,
      onClose: () => {
        clearInterval(timerInterval)
        this.router.navigateByUrl('/stores');
      }
    })
  }


}
