import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private API_URI:string = "http://carrito-compras.herokuapp.com/api";
  // private API_URI:string = "http://localhost:8000/api";


  constructor(private http:HttpClient) { }


  signup(form)
  {
    return this.http.post(this.API_URI+"/signup",form);
  }

  login(form) {
    return this.http.post(this.API_URI+"/login",form)
  }

  update(form,id)
  {
    return this.http.put(this.API_URI+"/updateUser/"+id,form,{
      headers:{
        'Authorization':'Bearer ' + localStorage.getItem("token"),
      }
    })
  }

  resetPassword(email)
  {
    return this.http.post(this.API_URI+"/reset-password",email);
  }

  changePassword(data)
  {
    return this.http.post(this.API_URI+"/changePassword",data)
  }
}
