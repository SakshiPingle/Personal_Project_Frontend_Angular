import { Component,OnDestroy,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import {Subscription} from 'rxjs'
@Component({
  selector: 'app-header-component',
  standalone: false,
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent implements OnInit,OnDestroy{
  constructor(
    private authService : AuthService
  ){}
  private loginListerSub = new Subscription;
 userIsAuthenticated = false; // later bind to AuthService
 ngOnInit(){
  this.userIsAuthenticated = this.authService.getLoginStatus()
  this.loginListerSub = this.authService.getLoginStatusListener()
  .subscribe(res =>{
    this.userIsAuthenticated = res
  })
  console.log(this.userIsAuthenticated)
 }

 onLogout(){
  this.authService.loggoutUser();
 }

 ngOnDestroy(){
  this.loginListerSub.unsubscribe();
 }
}
