import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import {CategoryService} from "../../services/shared/category.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    RouterLink,
    SolidIconsModule,
    NgOptimizedImage
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {


  public category: string;
  public selectedCategory: string;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.category = '';
    this.selectedCategory = '';
  }

  public selectCategory(category: string) {
    this.selectedCategory = category;
  }

  public saveCategory() {
    this.categoryService.setCategory(this.selectedCategory);
    console.log('Category selected: ', this.selectedCategory);
    this.router.navigate(['/register-work']);
  }
}
