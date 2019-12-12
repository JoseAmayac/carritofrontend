import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { CartProductService } from 'src/app/services/cart-product.service';
import { TokenService } from 'src/app/services/token.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import Swal from 'sweetalert2';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $:any;

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css']
})
export class ProductStoreComponent implements OnInit {
  public error:any = null;
  public products:any = [];
  public store:any = '';
  public storeOnly:any = '';
  public message:any = '';
  public productNew:any = [];
  public added:any = true;
  public id:any = null;
  public id_front:any = [];
  public vendido:any = [];
  public product_cart:any = {
    'product_id':null,
    'cart_id':null,
    'cantidad':1
  };
  constructor(public route:ActivatedRoute,public service: ProductsService,public cart_product: CartProductService, 
              public token:TokenService, public notify:SnotifyService,public spinner:Ng4LoadingSpinnerService) { }

  ngOnInit() {
      if(this.route.snapshot.paramMap.get('id'))
      {
          let id = this.route.snapshot.paramMap.get('id');
          this.service.listProducts(id).subscribe(
            data => this.handleResponse(data),
            error => console.error(error)
          )
      }
  }

  abrirModal(product)
  { 
    this.productNew = product;
    
    $('#modal1').modal()
  }

  addCart(product)
  {
    this.product_cart.product_id = product.id;
    this.product_cart.cart_id = JSON.parse(this.token.getCart()).id
    this.cart_product.addCart(this.product_cart).subscribe(
      data => this.handleResponseCart(data),
      error => console.error(error)
    ) 
    this.vendido[product.id] = true;
  }

  handleResponseCart(data)
  {
    this.notify.success(data.message,{
      timeout:4000,
      showProgressBar: false,
      position: SnotifyPosition.rightTop
    })
  }

  removeToCart(product)
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
        this.cart_product.removeProduct(product.id).subscribe(
          data => {
            this.vendido[product.id] = false;
            this.handleResponseRemove(data)
          },
          error => console.error(error)
        ) 
      }
    })
   }
  comparar(id)
  {
    return this.vendido[id];
  }

  handleResponseRemove(data)
  {
    this.spinner.hide()
    this.notify.info("Producto eliminado de tu carrito",{
      timeout:4000,
      showProgressBar: false,
      position:SnotifyPosition.rightTop
    })
  } 
  handleResponse(data)
  {
    if(!data.message)
    {
      this.products = data.products
      this.store = this.products[0]

      for (let i = 0; i < this.products.length; i++) {
        this.cart_product.buscarVendido(this.products[i].id).subscribe(
          data => this.handleResponseSend(data,this.products[i].id),
          error => console.error(error)
        )
      }
    }else{
      this.storeOnly = data.products
      this.message = data.message
    }
  }

  handleError(error )
  {
    this.error = error.error.error
  }

  evaluar(id_back)
  {
    return id_back;
  }
  handleResponseSend(data,id_for)
  {
    if(data.id_vendido == id_for)
    {
      this.vendido[id_for] = true;
      
    }else{
      this.vendido[id_for] = false;
    }
  }
}
