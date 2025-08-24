import { Component,OnDestroy,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import {Subscription} from 'rxjs'
import { CategoryService } from '../../../services/category/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list-component',
  standalone: false,
  templateUrl: './category-list-component.html',
  styleUrl: './category-list-component.css'
})
export class CategoryListComponent implements OnInit,OnDestroy{
categories:any;
private loginListerSub = new Subscription;
 userIsAuthenticated = false; // later bind to AuthService

 constructor(
    private authService : AuthService,
    private categoryService : CategoryService,
    private router:Router
  ){}

  ngOnInit(){
  this.userIsAuthenticated = this.authService.getLoginStatus()
  this.loginListerSub = this.authService.getLoginStatusListener()
  .subscribe(res =>{
    this.userIsAuthenticated = res
  })
  this.getAllCategory();
 }

 getAllCategory(){
  this.categoryService.getAllCategoryDetails()
  .subscribe((res: any)=>{
    console.log("res",res.data)
    this.categories = res.data
  })
 }

 deleteCategory(category :any){
  console.log("&&&&&&&&&&&&")
   this.categoryService.deleteCategory(category)
   .subscribe((res)=>{
        console.log("Category deleted")
        this.router.navigate(['category'])
        this.getAllCategory()
      })
 }

  ngOnDestroy(){
  this.loginListerSub.unsubscribe();
 }
}
