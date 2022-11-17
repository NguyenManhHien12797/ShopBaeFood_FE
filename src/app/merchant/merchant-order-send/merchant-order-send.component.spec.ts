import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantOrderSendComponent } from './merchant-order-send.component';

describe('MerchantOrderSendComponent', () => {
  let component: MerchantOrderSendComponent;
  let fixture: ComponentFixture<MerchantOrderSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantOrderSendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantOrderSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
