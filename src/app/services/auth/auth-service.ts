import { Injectable ,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);  // ✅ new way to inject HttpClient
  private router = inject(Router); 
  private baseUrl = 'http://localhost:3034'; //backend base url
  isLoggedIn = false;
  isLoggedInStatusListener = new Subject<boolean>();
  //  constructor(
//   private router:Router
//  ){}

  registerUser(user:any){
    return this.http.post(`${this.baseUrl}/register_user`, user)
  }

  loginUser(user:any){
    return this.http.post(`${this.baseUrl}/login_user`, user)
     .subscribe((result) => {
      console.log(result)
      this.isLoggedIn = true
      this.isLoggedInStatusListener.next(true)
      this.router.navigate(['/']);
  },error => {
    this.isLoggedIn = false
    this.isLoggedInStatusListener.next(false)
  })
  }

  loggoutUser(){
    this.router.navigate(['login'])
    this.isLoggedIn = false
    this.isLoggedInStatusListener.next(false)
  }

  getLoginStatus(){
    return this.isLoggedIn;
  }

  getLoginStatusListener(){
    return this.isLoggedInStatusListener.asObservable();
  }

}
