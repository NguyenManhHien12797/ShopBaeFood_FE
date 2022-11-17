import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantOrderReceiveComponent } from './merchant-order-receive.component';

describe('MerchantOrderReceiveComponent', () => {
  let component: MerchantOrderReceiveComponent;
  let fixture: ComponentFixture<MerchantOrderReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantOrderReceiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantOrderReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
