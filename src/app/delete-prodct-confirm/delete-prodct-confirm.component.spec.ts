import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProdctConfirmComponent } from './delete-prodct-confirm.component';

describe('DeleteProdctConfirmComponent', () => {
  let component: DeleteProdctConfirmComponent;
  let fixture: ComponentFixture<DeleteProdctConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProdctConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProdctConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
