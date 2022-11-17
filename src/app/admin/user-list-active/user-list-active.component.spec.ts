import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListActiveComponent } from './user-list-active.component';

describe('UserListActiveComponent', () => {
  let component: UserListActiveComponent;
  let fixture: ComponentFixture<UserListActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListActiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
