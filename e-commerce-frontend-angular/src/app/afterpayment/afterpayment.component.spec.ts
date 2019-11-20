import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterpaymentComponent } from './afterpayment.component';

describe('AfterpaymentComponent', () => {
  let component: AfterpaymentComponent;
  let fixture: ComponentFixture<AfterpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
