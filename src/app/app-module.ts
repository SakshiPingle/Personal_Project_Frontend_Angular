import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UserRegistrationComponent } from './user/user_registration/user-registration-component/user-registration-component';
import { UserLoginComponent } from './user/user_login/user-login-component/user-login-component';
import { ProductListComponent } from './product/product_list/product-list-component/product-list-component';
import { AddProductComponent } from './product/add_product/add-product-component/add-product-component';
import { AddCategoryComponent } from './category/add_category/add-category-component/add-category-component';
import { CategoryListComponent } from './category/category_list/category-list-component/category-list-component';
import { HeaderComponent } from './header/header-component/header-component';
// imports of angular material 
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [
    App,
    UserRegistrationComponent,
    UserLoginComponent,
    ProductListComponent,
    AddProductComponent,
    AddCategoryComponent,
    CategoryListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
