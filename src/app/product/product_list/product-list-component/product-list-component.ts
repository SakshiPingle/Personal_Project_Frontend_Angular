import { Component , OnInit,OnDestroy} from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import {Subscription} from 'rxjs'
import { ProductService } from '../../../services/product/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-component',
  standalone: false,
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css'
})
export class ProductListComponent implements OnInit,OnDestroy{
products_list : any ;
  constructor(
    private authService : AuthService,
    private productService : ProductService,
    private router : Router,
  ){}

  private loginListerSub = new Subscription;
 userIsAuthenticated = false; // later bind to AuthService

 ngOnInit(){
  this.userIsAuthenticated = this.authService.getLoginStatus()
  this.loginListerSub = this.authService.getLoginStatusListener()
  .subscribe(res =>{
    this.userIsAuthenticated = res
  })
  this.getAllProducts();
 }

 getAllProducts(){
  this.productService.getAllProducts()
  .subscribe((res:any)=>{
   this.products_list = res.data;
  })
 }

 deleteProduct(product : any){
  this.productService.deleteProduct(product)
  .subscribe(()=>{
    console.log("Product Deleted")
    this.getAllProducts();
     this.router.navigate(['product'])
  })
 }

 ngOnDestroy(){
  this.loginListerSub.unsubscribe();
 }

}
