import {Component, HostListener} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgHeroiconsModule, SolidIconsModule} from "@dimaslz/ng-heroicons";
import {CategoryService} from "../../services/shared/category.service";
import {OfferService} from "../../services/offer/offer.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Category, RequestCreateOffer, RequestImageOffer} from "../../models/offer";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {LoadingScreenComponent} from "../../core/components/loading-screen/loading-screen.component";


@Component({
  selector: 'app-register-work',
  standalone: true,
  imports: [
    RouterLink,
    SolidIconsModule,
    NgHeroiconsModule,
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    NgForOf,
    FormsModule,
    LoadingScreenComponent,
  ],
  templateUrl: './register-work.component.html',
  styleUrl: './register-work.component.scss'
})

export class RegisterWorkComponent{

  public registerForm: FormGroup;
  public loadingForm: boolean;
  public errorMessage: string | null = null;
  private _subscription = new Subscription();

  public categories: Category[] = [];
  filterText = ''; // Texto para filtrar
  filteredCategories: any[] = [];
  selectedCategory: string = '';
  isDropdownOpen = false;
  showInfo: boolean = false;

  public previewImages: string[] = [];

  public images: RequestImageOffer[] = [{
    file_name: '',
    file_extension: '',
    image: ''
  }];

  public offer: RequestCreateOffer = {
    name: '',
    description: '',
    deadline: 0,
    price: '',
    type: '',
    category: '',
    image_data: this.images,
    address: '',
    user_id: ''
  };

  ngOnInit() {
    this.getCategories();
  }


  constructor(private categoryService: CategoryService, private fb: FormBuilder, private router: Router, private offerService: OfferService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      category: ['', [Validators.required]],
      address: ['', [Validators.required]],
      categoryFilter: ['']
    });
    this.loadingForm = false;
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const dropdown = document.querySelector('.relative');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }

  private getCategories(): void {

    this._subscription.add(
      this.offerService.selectCategory().subscribe({
        next: (data) => {
          this.categories = data.data.categories
          return this.categories;
        },
        error: (err) => {
          console.error('Error:', err);
        },
        complete: () => {
          console.log('complete');
        }
      })
    );
  }

  public filterCategories(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredCategories = this.categories.filter((category) =>
      category.name.toLowerCase().includes(query)
    );
  }

  public selectCategory(category: string) {
    this.selectedCategory = category;
    this.isDropdownOpen = false;
    this.registerForm.get('category')?.setValue(category);
  }

  public toggleDropdown(event: any) {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.filteredCategories = this.categories;
    }
    event.stopPropagation();
  }

  public clearSelectedCategory(): void {
    this.isDropdownOpen = true;
    this.selectedCategory = '';
    this.registerForm.get('category')?.reset();
  }



  // public getLocation(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(resp => {
  //         resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
  //       },
  //       err => {
  //         reject(err);
  //       });
  //   });
  // }

  public onFilesSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {

      Array.from(target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = (reader.result as string).split(',')[1];

          const imageExists = this.images.some(
            img => img.file_name === file.name && img.image === imageData
          );

          if (!imageExists) {
            this.images.push({
              file_name: file.name,
              file_extension: file.type,
              image: imageData,
            });
          }
          const result = reader.result as string;

          if (result) {
            this.previewImages.push(result);
          } else {
            console.warn("No se pudo leer el archivo.");
          }

        };
        reader.readAsDataURL(file);
      });
    }
  }

  public removeImage(index: number) {
    this.previewImages.splice(index, 1);
  }

  public onSendForm() {

    const formValue = this.registerForm.value;

    this.offer = {
      ...this.offer,
      name: formValue.name,
      description: formValue.description,
      deadline: 0,
      price: formValue.price,
      type: "",
      category: formValue.category,
      image_data: this.images,
      address: formValue.address,
      user_id: this.offerService.getUserId()
    };

    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos';
      this.registerForm.markAllAsTouched()
      return;
    }

    this.loadingForm = true;

    this._subscription.add(
      this.offerService.createOffer(this.offer).subscribe({
        next: (res) => {
          if (res.id) {
            this.errorMessage = 'Error al iniciar sesión';
            return;
          }
          this.router.navigate(['/published-success']);
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          this.errorMessage = 'Error al iniciar sesión';
        },
        complete: () => {
          this.loadingForm = false;
        }

      })
    );
  }

}
