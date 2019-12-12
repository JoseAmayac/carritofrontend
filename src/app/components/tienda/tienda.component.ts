import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  public stores:any = {};
  public error:any = null;
  constructor(public service:ProductsService,public router:Router) { }

  ngOnInit() {
    this.service.stores().subscribe(
      data => this.handleResponse(data),
      error => console.error(error)
    )
  }

  handleResponse(data)
  {
    this.stores = data
    
  }
}
