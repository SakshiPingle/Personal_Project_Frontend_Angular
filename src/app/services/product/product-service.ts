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

  getProductDetailsById(product_id:any){
    return this.http.get(`${this.baseUrl}/get_edit_product/${product_id}`)
  }

  getAllProducts(){
   return this.http.get(`${this.baseUrl}/get_product_list`)
  }

  updateProduct(product_details:any){
        return this.http.put(`${this.baseUrl}/update_product`,product_details)
      .subscribe((data)=>{
           this.router.navigate(['product'])
        })
  }

  deleteProduct(product:any){
   let product_id = product.id;
    return this.http.delete(`${this.baseUrl}/delete_product/${product_id}`)
  }
}
