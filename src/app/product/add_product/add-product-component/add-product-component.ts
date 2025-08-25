import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product-service';
import { CategoryService } from '../../../services/category/category-service';
import { ActivatedRoute } from '@angular/router';

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
  productDetailsForEdit:any;
  mode = 'create'
   constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
  ) {}


  ngOnInit() {
    this.getCategorylist();
    this.productDetailsForEdit = {
      product_name : '',
      product_description: '',
      categoryId :0,
      product_price: 0,
    }
    this.route.paramMap.subscribe((paramMap : any) => {
        console.log("paramMap",paramMap)
        if(paramMap.has('id')){
          console.log("****************")
           this.mode = 'edit'
           let product_id = paramMap.get('id')
           this.productService.getProductDetailsById(product_id)
           .subscribe((data:any)=>{
            console.log("data",data)
            this.productDetailsForEdit = data.data[0];
            console.log("this.productDetailsForEdit",this.productDetailsForEdit)
           })
        }else{
          console.log("############")
          this.mode = 'create'
        }
     })
  }

 
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
    if(this.mode == 'edit'){
      let product_details = form.value;
      product_details.id =  this.productDetailsForEdit.id;
      this.productService.updateProduct(product_details)
    }else if(this.mode == 'create'){
      let product_details = form.value;
      this.productService.createProduct(product_details);
    }
  



    } else {
      alert('Error While adding new product');
    }
  }
}
