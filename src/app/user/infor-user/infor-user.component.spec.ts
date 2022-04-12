import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforUserComponent } from './infor-user.component';

describe('InforUserComponent', () => {
  let component: InforUserComponent;
  let fixture: ComponentFixture<InforUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InforUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InforUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
