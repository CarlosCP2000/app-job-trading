import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSentComponent } from './request-sent.component';

describe('RequestSentComponent', () => {
  let component: RequestSentComponent;
  let fixture: ComponentFixture<RequestSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestSentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
