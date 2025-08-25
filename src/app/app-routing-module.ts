import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product_list/product-list-component/product-list-component';
import { UserLoginComponent } from './user/user_login/user-login-component/user-login-component';
import { UserRegistrationComponent } from './user/user_registration/user-registration-component/user-registration-component';
import { CategoryListComponent } from './category/category_list/category-list-component/category-list-component';
import { AddCategoryComponent } from './category/add_category/add-category-component/add-category-component';
import { AddProductComponent } from './product/add_product/add-product-component/add-product-component';
const routes: Routes = [
  {path:'',component:ProductListComponent},
  {path:'login',component:UserLoginComponent},
  {path:'registration',component:UserRegistrationComponent},
  {path:'category',component:CategoryListComponent},
  {path:'add-categpry',component:AddCategoryComponent},
  {path:'edit-category/:id',component:AddCategoryComponent},
  {path:'product',component:ProductListComponent},
  {path:'add-product',component:AddProductComponent},
  {path:'edit-product/:product_id',component:AddProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
