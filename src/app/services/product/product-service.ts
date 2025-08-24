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

  createProduct(){
    // this.http.post(`this.baseUrl/`)
   
  }

  getProductDetails(){

  }

  updateProduct(){

  }

  deleteProduct(){

  }
}
