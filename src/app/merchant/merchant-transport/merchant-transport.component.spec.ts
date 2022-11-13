import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantTransportComponent } from './merchant-transport.component';

describe('MerchantTransportComponent', () => {
  let component: MerchantTransportComponent;
  let fixture: ComponentFixture<MerchantTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
