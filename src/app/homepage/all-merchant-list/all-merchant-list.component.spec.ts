import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMerchantListComponent } from './all-merchant-list.component';

describe('AllProductListComponent', () => {
  let component: AllMerchantListComponent;
  let fixture: ComponentFixture<AllMerchantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMerchantListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMerchantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
