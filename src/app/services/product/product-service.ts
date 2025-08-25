import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);  // ✅ new way to inject HttpClient
  private router = inject(Router); 
  private baseUrl = 'http://localhost:3034'; //backend base url

  createProduct(product_details:any){
    return this.http.post(`${this.baseUrl}/create_product`,product_details)
    .subscribe((res)=>{
       alert("New Product Added")
       this.router.navigate(['product'])
    },(error) => {
    alert("Error Adding New Product")
    this.router.navigate(['product'])
  })   
  }

  getProductDetailsById(){
    
  }

  getAllProducts(){
   return this.http.get(`${this.baseUrl}/get_product_list`)
  }

  updateProduct(){

  }

  deleteProduct(product:any){
   let product_id = product.id;
    return this.http.delete(`${this.baseUrl}/delete_product/${product_id}`)
  }
}
