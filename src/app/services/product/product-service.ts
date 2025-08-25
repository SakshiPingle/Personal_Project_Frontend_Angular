import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  getAllProducts(pageSize :any , currentPage : any , sortType :any, search:any){
   return this.http.get(`${this.baseUrl}/get_product_list/${pageSize}/${currentPage}/${sortType}?search=${search || ''}`)
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

  uploadExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.baseUrl}/upload-excel`, formData);
  }
}
