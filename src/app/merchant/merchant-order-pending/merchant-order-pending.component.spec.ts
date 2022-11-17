import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantOrderPendingComponent } from './merchant-order-pending.component';

describe('MerchantOrderPendingComponent', () => {
  let component: MerchantOrderPendingComponent;
  let fixture: ComponentFixture<MerchantOrderPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantOrderPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantOrderPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
