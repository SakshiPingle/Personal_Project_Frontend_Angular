import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-registration-component',
  standalone: false,
  templateUrl: './user-registration-component.html',
  styleUrl: './user-registration-component.css'
})
export class UserRegistrationComponent {

constructor(
  private authService : AuthService,
  private router:Router
){}

 registerUser(form:NgForm){
  if (
      form.valid 
    ) {
      console.log(form.value);
      let user_details = form.value;
      this.authService.registerUser(user_details).subscribe({
      next: (res) => {
        console.log('User registered', res);
        form.resetForm(); // ✅ clears values + resets touched/dirty state
        this.router.navigate(['login'])
      },
      error: (err) => console.error(err)
    });
    } else {
      alert("Error While Registration Of User")
    }
  }

  
}

