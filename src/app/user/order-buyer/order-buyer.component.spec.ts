import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyerComponent } from './order-buyer.component';

describe('OrderBuyerComponent', () => {
  let component: OrderBuyerComponent;
  let fixture: ComponentFixture<OrderBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBuyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
