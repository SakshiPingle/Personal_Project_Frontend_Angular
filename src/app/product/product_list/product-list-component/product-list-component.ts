import { Component , OnInit,OnDestroy} from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-product-list-component',
  standalone: false,
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css'
})
export class ProductListComponent implements OnInit,OnDestroy{
products=[{
  name:'bubu',
  category:'animal',
  description:'abc',
  price:23,
}]
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

 ngOnDestroy(){
  this.loginListerSub.unsubscribe();
 }

}
