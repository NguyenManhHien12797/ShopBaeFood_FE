import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantOrderDetailComponent } from './merchant-order-detail.component';

describe('MerchantOrderDetailComponent', () => {
  let component: MerchantOrderDetailComponent;
  let fixture: ComponentFixture<MerchantOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantOrderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
