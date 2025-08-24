import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product-service';

@Component({
  selector: 'app-add-product-component',
  standalone: false,
  templateUrl: './add-product-component.html',
  styleUrl: './add-product-component.css'
})
export class AddProductComponent {
categories=[{
  id:1,
  name:'lklkvn'
}]
    constructor(
    private authService:AuthService,
    private productService:ProductService,
    private router:Router
  ){}

  AddProduct(form:NgForm){
   if (
      form.valid 
    ) {
      console.log(form.value);
      let product_details = form.value;
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      product_details.uniqueID = randomNumber
      this.productService.createProduct(product_details)
    } else {
      alert("Error While adding new product")
    }
  }

}
