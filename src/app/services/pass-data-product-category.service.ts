import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCategory } from '../Interfaces/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class PassDataProductCategoryService {
  listenProductCategory$: BehaviorSubject<Array<ProductCategory>> = new BehaviorSubject(null);
  constructor() { }
  
}
