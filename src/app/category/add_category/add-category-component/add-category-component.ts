import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product-service';

@Component({
  selector: 'app-add-category-component',
  standalone: false,
  templateUrl: './add-category-component.html',
  styleUrl: './add-category-component.css'
})
export class AddCategoryComponent {

    constructor(
    private authService:AuthService,
    private productService:ProductService,
    private router:Router
  ){}

  AddCategory(form:NgForm){
   if (
      form.valid 
    ) {
      console.log(form.value);
      let category_details = form.value;
      this.productService.createProduct()
    } else {
      alert("Error While login")
    }
  }

}
