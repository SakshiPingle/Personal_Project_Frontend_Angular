import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-component',
  standalone: false,
  templateUrl: './user-login-component.html',
  styleUrl: './user-login-component.css'
})
export class UserLoginComponent {
  isLoggedIn = false

  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  userLoginFunction(form:NgForm){
    if (
      form.valid 
    ) {
      console.log(form.value);
      let user_details = form.value;
      this.authService.loginUser(user_details)
    } else {
      alert("Error While login")
    }
  }


}
