import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import {CategoryService} from "../../services/shared/category.service";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    RouterLink,
    SolidIconsModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  public category: string;
  public selectedCategory: string;

  constructor(private categoryService: CategoryService) {
    this.category = '';
    this.selectedCategory = '';
  }

  public selectCategory(category: string) {
    this.selectedCategory = category;
  }

  public saveCategory() {
    this.categoryService.setCategory(this.selectedCategory);
  }
}
