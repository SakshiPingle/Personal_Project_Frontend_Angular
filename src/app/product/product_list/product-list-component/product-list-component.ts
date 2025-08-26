import { Component , OnInit,OnDestroy,ViewChild, TemplateRef} from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import {Subscription} from 'rxjs'
import { ProductService } from '../../../services/product/product-service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-product-list-component',
  standalone: false,
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css'
})
export class ProductListComponent implements OnInit,OnDestroy{
 @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
// for pagination 
totalProductLength = 0;
productPageSizeSelectedForPagination = 10
pageSizeOptionsForPagination = [10,20,50];
currentPage = 1;
// sorting config
sortOrder = 'asc';  // default
// products that we get from backend
products_list : any ;
// search
search:any;

// Is logged in 
isLoggedin = false

  constructor(
    private authService : AuthService,
    private productService : ProductService,
    private router : Router,
    private dialog: MatDialog
  ){}

  private loginListerSub = new Subscription;
 userIsAuthenticated = false; // later bind to AuthService

 ngOnInit(){
  this.userIsAuthenticated = this.authService.getLoginStatus()
  this.loginListerSub = this.authService.getLoginStatusListener()
  .subscribe(res =>{
    this.userIsAuthenticated = res
  })
  this.getAllProducts(this.productPageSizeSelectedForPagination , this.currentPage , this.sortOrder,this.search);
 }

 getAllProducts(pageSize : any , currentPage :any , sortType :any , search :any){
  this.productService.getAllProducts(pageSize , currentPage , sortType , search)
  .subscribe((res:any)=>{
     console.log("res.pagination",res.pagination)
   this.products_list = res.data;
   this.totalProductLength = res.totalItems;

  })
 }

   // ✅ open confirm dialog before deleting
  openDeleteDialog(product: any) {
    const dialogRef = this.dialog.open(this.deleteDialog, {
      width: '300px',
      data: product,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(product);
      }
    });
  }

 deleteProduct(product : any){
  this.productService.deleteProduct(product)
  .subscribe(()=>{
    console.log("Product Deleted")
    this.getAllProducts(this.productPageSizeSelectedForPagination , this.currentPage , this.sortOrder ,this.search);
     this.router.navigate(['product'])
  })
 }

 onChangedPage(pageData : PageEvent){
   this.currentPage = pageData.pageIndex + 1;
     this.productPageSizeSelectedForPagination = pageData.pageSize
     this.getAllProducts(this.productPageSizeSelectedForPagination  , this.currentPage , this.sortOrder , this.search);
 }

 onSortChange(order: string){
  this.sortOrder = order;
  this.getAllProducts(this.productPageSizeSelectedForPagination  , this.currentPage , this.sortOrder , this.search);
 }


onSearchChange(){
  this.currentPage = 1;
  this.getAllProducts(this.productPageSizeSelectedForPagination  , this.currentPage , this.sortOrder , this.search);
}





downloadReport() {
  this.productService.downloadReport().subscribe({
    next: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'products-report.xlsx'; // 👈 forces auto download to Downloads
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
    error: () => {
      console.error("Download failed");
    }
  });
}

 ngOnDestroy(){
  this.loginListerSub.unsubscribe();
 }
 
 

}
