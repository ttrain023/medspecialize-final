import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  userid!: any;

  constructor( private http: HttpClient, private router:Router) { }

  createUser(user: { email: string; password: String; name: String; role: String; }){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/create', user, {headers: headers})
  }

  displayUsers(){
    let headers = new HttpHeaders();
    return this.http.get('http://localhost:3000/users/read', {headers: headers})
  }

  authenticateEmail(user: { email: string; password: String}){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
  }

  storeUserData(token: any, user: any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('email', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('http://localhost:3000/users/profile', {headers: headers});
  }

  loggedIn() {
    this.loadToken();
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.authToken); //returns False if token is g || True if not g
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  userCatcher(id: any) {
    localStorage.setItem('id_number', JSON.stringify(id));
    this.userid = id;
  }

  loadID(){
    const id = localStorage.getItem('id_number');
    this.userid = id;
  }

  updateThisUser(user: { email: string; password: String; name: String; role: String; }) {
    this.loadID();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('http://localhost:3000/users/update/'+JSON.stringify(this.userid), user, {headers: headers});
  }
}
