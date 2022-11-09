import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantListBlockComponent } from './merchant-list-block.component';

describe('MerchantListBlockComponent', () => {
  let component: MerchantListBlockComponent;
  let fixture: ComponentFixture<MerchantListBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantListBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantListBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
