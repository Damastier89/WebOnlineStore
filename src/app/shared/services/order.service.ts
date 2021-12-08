import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FbCreateResponse } from '../../../app/admin/shared/interfaces/fbCreateResponse';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private http: HttpClient) { }

  public addProductToDb(product: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.fbDbUrl}/orders.json`, product)
      .pipe(
        map((respone: FbCreateResponse) => {
          return {
            ...product,
            id: respone.name,
            date: new Date(product.date)
          }
        })
      );
  }

  public getAllOrders(): Observable<Order[]> {
    return this.http.get<Order>(`${environment.fbDbUrl}/orders.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return Object.keys(response).map( key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
        })
      );
  }

  public deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/orders/${id}.json`);
  }
}
