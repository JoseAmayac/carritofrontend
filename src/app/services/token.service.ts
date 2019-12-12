import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public iss:any = {
    login : 'https://carrito-compras.herokuapp.com/api/login',
    signup: 'https://carrito-compras.herokuapp.com/api/signup'
  }
  constructor() { }

  handle(data) {
    this.set(data)
  }

  set(data)
  {
    localStorage.setItem('token',data.access_token)
    localStorage.setItem('user',JSON.stringify(data.user))
    localStorage.setItem('cart',JSON.stringify(data.user.cart))
  }

  setUser(user)
  {
    localStorage.setItem("user",JSON.stringify(user))
  }
  getToken()
  {
    return localStorage.getItem("token");
  }

  getUser()
  {
    return localStorage.getItem("user")
  }

  getCart()
  {
    return localStorage.getItem("cart")
  }

  remove()
  {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
  }

  isValid()
  {
    const token  = this.getToken();
    if(token)
    {
      const payload = this.payload(token);
      const iss = payload.iss.replace("http","https");
      if(payload)
      {
        return Object.values(this.iss).indexOf(iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token)
  {
    const payload =  token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload)
  {
    return JSON.parse(atob(payload))
  }

  loggedIn()
  {
    return this.isValid();
  }
}
