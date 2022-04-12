import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserInPmComponent } from './list-user-in-pm.component';

describe('ListUserInPmComponent', () => {
  let component: ListUserInPmComponent;
  let fixture: ComponentFixture<ListUserInPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserInPmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserInPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
