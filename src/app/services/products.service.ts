import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  private API_URI = "http://carrito-compras.herokuapp.com/api";
  // private API_URI:string = "http://localhost:8000/api";


  constructor(private http:HttpClient) { }

  stores()
  {
    return this.http.get(this.API_URI+"/stores");
  }

  listProducts(id_tienda: any) {
    return this.http.get(this.API_URI+"/products?id="+id_tienda)
  }
}
