import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterWorkComponent } from './filter-work.component';

describe('FilterWorkComponent', () => {
  let component: FilterWorkComponent;
  let fixture: ComponentFixture<FilterWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
