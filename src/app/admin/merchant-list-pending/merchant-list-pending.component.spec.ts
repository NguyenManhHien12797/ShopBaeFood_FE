import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantListPendingComponent } from './merchant-list-pending.component';

describe('MerchantListPendingComponent', () => {
  let component: MerchantListPendingComponent;
  let fixture: ComponentFixture<MerchantListPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantListPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantListPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
