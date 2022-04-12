import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderInUserBuyerComponent } from './list-order-in-user-buyer.component';

describe('ListOrderInUserBuyerComponent', () => {
  let component: ListOrderInUserBuyerComponent;
  let fixture: ComponentFixture<ListOrderInUserBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrderInUserBuyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrderInUserBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
