import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgHeroiconsModule, SolidIconsModule} from "@dimaslz/ng-heroicons";
import {CategoryService} from "../../services/shared/category.service";
import {OfferService} from "../../services/offer/offer.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {RequestCreateOffer, RequestImageOffer} from "../../models/offer";

@Component({
  selector: 'app-register-work',
  standalone: true,
  imports: [
    RouterLink,
    SolidIconsModule,
    NgHeroiconsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-work.component.html',
  styleUrl: './register-work.component.scss'
})
export class RegisterWorkComponent {

  public registerForm: FormGroup;
  public loadingForm: boolean;
  public errorMessage: string | null = null;
  private _subscription = new Subscription();

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
    user_id: ''
  };


  constructor(private categoryService: CategoryService, private fb: FormBuilder, private router: Router, private offerService: OfferService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    this.loadingForm = false;
  }

  public onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.images = [{
          file_name: file.name,
          file_extension: file.type,
          image: reader.result as string
        }];
      };
      reader.readAsDataURL(file);
    }
  }

  public onSendForm() {

    this.loadingForm = true;
    const formValue = this.registerForm.value;

    this.offer = {
      ...this.offer,
      name: formValue.name,
      description: formValue.description,
      deadline: Number(formValue.deadline),
      price: formValue.price,
      type: "",
      category: this.categoryService.getCategory(),
      image_data: this.images,
      user_id: this.offerService.getUserId()
    };

    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos';
      this.registerForm.markAllAsTouched()
      console.log(this.registerForm.value)
      return;
    }

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
          console.log('completo')
        }

      })
    );
  }

}
