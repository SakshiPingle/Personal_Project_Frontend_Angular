import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);  // ✅ new way to inject HttpClient
  private router = inject(Router); 
  private baseUrl = 'http://localhost:3034'; //backend base url

  createCategory(product_details:any){
    return this.http.post(`${this.baseUrl}/create_category`,product_details)
    .subscribe((res)=>{
       alert("New category Added")
       this.router.navigate(['category'])
    },error => {
    alert("Error Adding New category")
    this.router.navigate(['category'])
  })   
  }

  getAllCategoryDetails(){
   return this.http.get(`${this.baseUrl}/get_category_list`)
  }

  getCategorydetailsById(category_id : any){
    return this.http.get(`${this.baseUrl}/get_edit_category/${category_id}`)
  }

  updateCategory(category : any){
     return this.http.put(`${this.baseUrl}/update_category`,category)
      .subscribe((data)=>{
           this.router.navigate(['category'])
        })
  }

  deleteCategory(category :any){
      let category_id = category.category_id;
      return this.http.delete(`${this.baseUrl}/delete_category/${category_id}`)
      
  }
}
