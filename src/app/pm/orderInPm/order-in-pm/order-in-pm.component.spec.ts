import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInPmComponent } from './order-in-pm.component';

describe('OrderInPmComponent', () => {
  let component: OrderInPmComponent;
  let fixture: ComponentFixture<OrderInPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderInPmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
