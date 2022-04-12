import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproductcategoryComponent } from './listproductcategory.component';

describe('ListproductcategoryComponent', () => {
  let component: ListproductcategoryComponent;
  let fixture: ComponentFixture<ListproductcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListproductcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListproductcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
