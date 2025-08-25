import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product-service';
import { CategoryService } from '../../../services/category/category-service';

interface Category {
  category_name: string;
  id: number;
  // add other properties if needed, e.g. id: number;
}

@Component({
  selector: 'app-add-product-component',
  standalone: false,
  templateUrl: './add-product-component.html',
  styleUrl: './add-product-component.css',
})
export class AddProductComponent implements OnInit {
  category_list: Category[] = [];

  ngOnInit() {
    this.getCategorylist();
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  getCategorylist() {
    this.categoryService.getAllCategoryDetails().subscribe(
      (res: any) => {
        this.category_list = res.data;
        console.log('this.category_list', this.category_list);
      },
      (err) => {
        console.log('Error getting the category list');
      }
    );
  }

  AddProduct(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      let product_details = form.value;
      // const randomNumber = Math.floor(10000 + Math.random() * 90000);
      // product_details.uniqueID = randomNumber;
      this.productService.createProduct(product_details);
    } else {
      alert('Error While adding new product');
    }
  }
}
