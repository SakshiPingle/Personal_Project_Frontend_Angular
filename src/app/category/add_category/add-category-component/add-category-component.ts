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
    private authService:AuthService,
    private categoryService : CategoryService,
    private router:Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.categoryDetailsForEdit = { category_name: '' };
     this.route.paramMap.subscribe((paramMap : any) => {
        console.log("paramMap",paramMap)
        if(paramMap.has('category_id')){
          console.log("****************")
           this.mode = 'edit'
           let category_id = paramMap.get('category_id')
           this.categoryService.getCategorydetailsById(category_id)
           .subscribe((data:any)=>{
            console.log("data",data)
            this.categoryDetailsForEdit = data.data;;

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
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        category_details.uniqueID = randomNumber
        this.categoryService.createCategory(category_details)
      }else if (this.mode == 'edit'){
        let category_details = form.value;
        category_details.uniqueID =  this.categoryDetailsForEdit.category_id;
        console.log(category_details)
        this.categoryService.updateCategory(this.categoryDetailsForEdit)
  
      }
      }else {
        alert("Error While adding new category")
      }
  }

}
