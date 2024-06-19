import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private category: string;
  constructor() {
    this.category = '';
  }

  public setCategory(category: string) {
    this.category = category;
  }
  public getCategory() {
    return this.category
  }
}
