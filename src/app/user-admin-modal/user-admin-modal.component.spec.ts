import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminModalComponent } from './user-admin-modal.component';

describe('UserAdminModalComponent', () => {
  let component: UserAdminModalComponent;
  let fixture: ComponentFixture<UserAdminModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAdminModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
