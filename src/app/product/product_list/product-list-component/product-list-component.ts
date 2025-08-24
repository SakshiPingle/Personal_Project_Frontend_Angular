import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list-component',
  standalone: false,
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css'
})
export class ProductListComponent {
products=[{
  name:'bubu',
  category:'animal',
  description:'abc',
  price:23,
}]
}
