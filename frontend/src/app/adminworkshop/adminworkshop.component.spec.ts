import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminworkshopComponent } from './adminworkshop.component';

describe('AdminworkshopComponent', () => {
  let component: AdminworkshopComponent;
  let fixture: ComponentFixture<AdminworkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminworkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminworkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
