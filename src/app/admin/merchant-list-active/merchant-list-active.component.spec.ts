import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantListActiveComponent } from './merchant-list-active.component';

describe('MerchantListActiveComponent', () => {
  let component: MerchantListActiveComponent;
  let fixture: ComponentFixture<MerchantListActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantListActiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantListActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
