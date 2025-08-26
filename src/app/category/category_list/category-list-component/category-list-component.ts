import { Component,OnDestroy,OnInit ,ViewChild, TemplateRef} from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import {Subscription} from 'rxjs'
import { CategoryService } from '../../../services/category/category-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category-list-component',
  standalone: false,
  templateUrl: './category-list-component.html',
  styleUrl: './category-list-component.css'
})
export class CategoryListComponent implements OnInit,OnDestroy{
@ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
categories:any;
private loginListerSub = new Subscription;
 userIsAuthenticated = false; // later bind to AuthService

 constructor(
    private authService : AuthService,
    private categoryService : CategoryService,
    private router:Router,
    private dialog: MatDialog
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

   openDeleteDialog(category: any) {
    const dialogRef = this.dialog.open(this.deleteDialog, {
      width: '300px',
      data: category,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCategory(category);
      }
    });
  }

 deleteCategory(category :any){
  console.log("&&&&&&&&&&&&")
   this.categoryService.deleteCategory(category)
   .subscribe((res)=>{
        console.log("Category deleted")
        this.getAllCategory()
        this.router.navigate(['category'])
      })
 }

  ngOnDestroy(){
  this.loginListerSub.unsubscribe();
 }
}
