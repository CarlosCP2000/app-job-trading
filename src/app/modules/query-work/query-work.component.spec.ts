import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryWorkComponent } from './query-work.component';

describe('QueryWorkComponent', () => {
  let component: QueryWorkComponent;
  let fixture: ComponentFixture<QueryWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueryWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
