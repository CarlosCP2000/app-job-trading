import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedSuccessComponent } from './published-success.component';

describe('PublishedSuccessComponent', () => {
  let component: PublishedSuccessComponent;
  let fixture: ComponentFixture<PublishedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishedSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublishedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
