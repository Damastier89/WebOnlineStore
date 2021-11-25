import { FbCreateResponse } from './../interfaces/fbCreateResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,) { }

  public create(product: Product): Observable<Product> {
    return this.http.post<any>(`${environment.fbDbUrl}/products.json`, product)
    .pipe(
      map( (response: FbCreateResponse) => {
        return {
          ...product,
          id: response.name,
          date: new Date(product.date)
        }
      })
    );
  }
}
