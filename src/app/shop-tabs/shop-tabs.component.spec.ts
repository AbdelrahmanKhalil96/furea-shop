import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTabsComponent } from './shop-tabs.component';

describe('ShopTabsComponent', () => {
  let component: ShopTabsComponent;
  let fixture: ComponentFixture<ShopTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
