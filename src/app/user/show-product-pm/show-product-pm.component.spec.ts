import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductPmComponent } from './show-product-pm.component';

describe('ShowProductPmComponent', () => {
  let component: ShowProductPmComponent;
  let fixture: ComponentFixture<ShowProductPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductPmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
