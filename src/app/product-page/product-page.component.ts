import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product } from '../admin/shared/interfaces/product';
import { ProductService } from '../admin/shared/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  public products$!: Observable<Product>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.products$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.productService.getProductById(params['id']);
      })
    )
  }

  public addProductToCard(product: Product): void {
    this.productService.addProductToCart(product);
  }

}
