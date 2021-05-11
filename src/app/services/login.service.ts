import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //generate Token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generateToken`,loginData);
  }

  //login user : set token in local storage
  public loginUser(token){
    localStorage.setItem("token",token);
    return true;
  }

  //isLoogedIn: user is loggedin or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  //logout:: remove token from localstorage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //getToken
  public getToken(){
    return localStorage.getItem('token');
  }

  //set userDetail
  public setUser(user){
    localStorage.setItem("user",JSON.stringify(user));
  }

  //getUser
  public getUser(){

    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole(){

    let user=this.getUser();
    return user.authorities[0].authority;
    //return user.authorities;
  }

}
