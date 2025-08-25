import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product-service';
import { CategoryService } from '../../../services/category/category-service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-category-component',
  standalone: false,
  templateUrl: './add-category-component.html',
  styleUrl: './add-category-component.css'
})
export class AddCategoryComponent implements OnInit{
    mode = 'create'
    categoryDetailsForEdit:any;
    constructor(
    private categoryService : CategoryService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.categoryDetailsForEdit = { category_name: '' };
     this.route.paramMap.subscribe((paramMap : any) => {
        console.log("paramMap",paramMap)
        if(paramMap.has('id')){
          console.log("****************")
           this.mode = 'edit'
           let category_id = paramMap.get('id')
           this.categoryService.getCategorydetailsById(category_id)
           .subscribe((data:any)=>{
            console.log("data",data.data)
            this.categoryDetailsForEdit = data.data[0];
           })
        }else{
          console.log("############")
          this.mode = 'create'
        }
     })
  }

  AddCategory(form:NgForm){
   if (
      form.valid 
    ) {
      console.log("this.mode",this.mode)
      if(this.mode == 'create'){
        let category_details = form.value;
        this.categoryService.createCategory(category_details)
      }else if (this.mode == 'edit'){
        let category_details = form.value;
        category_details.id =  this.categoryDetailsForEdit.id;
        console.log(category_details)
        this.categoryService.updateCategory(category_details)
  
      }
      }else {
        alert("Error While adding new category")
      }
  }

}
