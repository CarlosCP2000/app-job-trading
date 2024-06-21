import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import {CategoryService} from "../../services/shared/category.service";

@Component({
  selector: 'app-filter-work',
  standalone: true,
    imports: [
        RouterLink,
        SolidIconsModule
    ],
  templateUrl: './filter-work.component.html',
  styleUrl: './filter-work.component.scss'
})
export class FilterWorkComponent {

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
    this.router.navigate(['/query-work']);
  }

}
