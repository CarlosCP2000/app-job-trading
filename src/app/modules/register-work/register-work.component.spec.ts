import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWorkComponent } from './register-work.component';

describe('RegisterWorkComponent', () => {
  let component: RegisterWorkComponent;
  let fixture: ComponentFixture<RegisterWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
