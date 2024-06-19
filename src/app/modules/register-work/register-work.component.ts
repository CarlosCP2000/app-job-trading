import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgHeroiconsModule, SolidIconsModule} from "@dimaslz/ng-heroicons";
import {CategoryService} from "../../services/shared/category.service";
import {OfferService} from "../../services/offer/offer.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {RequestCreateOffer} from "../../models/offer";

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

  public offer: RequestCreateOffer = {
    name: '',
    description: '',
    deadline: 0,
    price: '',
    type: '',
    category: '',
    image_data: [],
    user_id: ''
  };

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private router: Router, private offerService: OfferService) {
    this.registerForm = this.fb.group({
      name: [''],
      description: [''],
      deadline: [''],
      price: [''],
      type: [''],
      category: [''],
    });
    this.loadingForm = false;
  }

  public onSendForm() {

    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos';
      this.registerForm.markAllAsTouched()
      return;
    }

    this.loadingForm = true;
    const formValue = this.registerForm.value;

    this.offer = {
      ...this.offer,
      name: formValue.name,
      description: formValue.description,
      deadline: formValue.deadline,
      price: formValue.price,
      type: formValue.type,
      category: this.categoryService.getCategory(),
      user_id: '1'
    };

    this._subscription.add(
      this.offerService.createOffer(this.offer).subscribe({
        next: (res) => {
          if (res.id) {
            this.errorMessage = 'Error al iniciar sesión';
            return;
          }
          this.router.navigate(['/home']);
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
