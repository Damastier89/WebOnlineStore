import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/admin/shared/services/product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public typeProduct: any = 'Phone';

  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
  }

  public setTypeProduct(typeCurrentProduct: string): void {
    this.typeProduct = typeCurrentProduct;

    if (this.typeProduct !== 'shopping-cart') {
      this.router.navigate(['/'], {
        queryParams: {
          typeProduct: this.typeProduct
        }
      })
    };

    this.productService.setTypeProduct(this.typeProduct);
  }

}
