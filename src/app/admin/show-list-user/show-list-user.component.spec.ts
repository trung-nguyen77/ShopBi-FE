import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListUserComponent } from './show-list-user.component';

describe('ShowListUserComponent', () => {
  let component: ShowListUserComponent;
  let fixture: ComponentFixture<ShowListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
