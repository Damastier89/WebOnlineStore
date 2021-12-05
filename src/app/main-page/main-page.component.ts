import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../admin/shared/interfaces/product';
import { ProductService } from '../admin/shared/services/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public products$!: Observable<Product[]>;

  constructor(
    public producteService: ProductService,
  ) { }

  ngOnInit(): void {
    this.products$ = this.producteService.getAllProduct();
  }

}
