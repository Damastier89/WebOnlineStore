import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/admin/shared/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName: ''): any {
    if (!productName.trim()) {
      return products;
    } 

    return products.filter((product: Product) => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });
  }

}
