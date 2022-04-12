import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderInPmComponent } from './detail-order-in-pm.component';

describe('DetailOrderInPmComponent', () => {
  let component: DetailOrderInPmComponent;
  let fixture: ComponentFixture<DetailOrderInPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOrderInPmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOrderInPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
