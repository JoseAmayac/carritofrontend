import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CartProductService {
  public API_URI:any = "http://carrito-compras.herokuapp.com/api";
  // public API_URI:string = "http://localhost:8000/api";

  constructor(public http:HttpClient,public token:TokenService) { }

  addCart(product)
  {
    return this.http.post(this.API_URI+"/productCart",product)
  }

  buscarVendido(id)
  {
    return this.http.get(this.API_URI+"/buscar/"+id+"/cart/"+JSON.parse(this.token.getCart()).id)
  }

  removeProduct(id)
  {
    let id_cart = JSON.parse(this.token.getCart()).id;
    return this.http.delete(this.API_URI+"/remove/"+id+"/cart/"+id_cart);
  }

  listProducts()
  {
    return this.http.get(this.API_URI+"/productCart/"+JSON.parse(this.token.getCart()).id)
  }

  updateProduct(id,cantidad)
  {
    let valor = {
      cantidad
    }
    return this.http.put(this.API_URI+"/productCart/"+id,valor);
  }

  realizarCompra()
  {
    return this.http.delete(this.API_URI+"/productCart/"+JSON.parse(this.token.getCart()).id);
  }

  consultarCompras()
  {
    return this.http.get(this.API_URI+"/productCartShow/"+JSON.parse(this.token.getCart()).id);
  }



}
