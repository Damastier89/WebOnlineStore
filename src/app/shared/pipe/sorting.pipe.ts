import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../admin/shared/interfaces/product';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: Product[], type: ''): any {
    return products.filter((product: Product) => {
      return product.type == type;
    });
  }

}
