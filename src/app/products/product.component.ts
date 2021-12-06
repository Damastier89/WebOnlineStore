import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../admin/shared/interfaces/product';
import { ProductService } from '../admin/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {}

  public addProductToCard(product: Product): void {
    this.productService.addProductToCart(product);
  }

}
