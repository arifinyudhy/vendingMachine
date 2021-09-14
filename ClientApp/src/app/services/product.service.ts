import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  root: string = 'api/products/';
  constructor(private _http: HttpClient) { }
  getProducts() {
    return this._http.get(this.root);
  }
  checkout(id: string, payload = {}) {
    return this._http.put(this.root + id, payload);
  }
}
