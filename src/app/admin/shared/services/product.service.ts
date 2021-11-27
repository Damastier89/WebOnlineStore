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

  public getAllProduct(): Observable<Product[]> {
    return this.http.get<Product>(`${environment.fbDbUrl}/products.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return Object.keys(response).map( key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
        }));
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.fbDbUrl}/products/${id}.json`)
    .pipe(
      map((product: Product) => {
        return {
          ...product,
          id,
          date: new Date(product.date)
        }
      })
    );
  }
}
