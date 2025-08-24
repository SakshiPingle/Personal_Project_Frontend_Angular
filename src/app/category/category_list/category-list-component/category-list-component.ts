import { Component,OnDestroy,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-category-list-component',
  standalone: false,
  templateUrl: './category-list-component.html',
  styleUrl: './category-list-component.css'
})
export class CategoryListComponent implements OnInit,OnDestroy{
categories=[{
  name:'acijw',
  description:'jkewoif'
}]
  private loginListerSub = new Subscription;
 userIsAuthenticated = false; // later bind to AuthService
 constructor(
    private authService : AuthService
  ){}
  ngOnInit(){
  this.userIsAuthenticated = this.authService.getLoginStatus()
  this.loginListerSub = this.authService.getLoginStatusListener()
  .subscribe(res =>{
    this.userIsAuthenticated = res
  })
  console.log(this.userIsAuthenticated)
 }

  ngOnDestroy(){
  this.loginListerSub.unsubscribe();
 }
}
