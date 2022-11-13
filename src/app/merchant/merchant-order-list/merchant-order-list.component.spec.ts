import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantOrderListComponent } from './merchant-order-list.component';

describe('MerchantOrderListComponent', () => {
  let component: MerchantOrderListComponent;
  let fixture: ComponentFixture<MerchantOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
