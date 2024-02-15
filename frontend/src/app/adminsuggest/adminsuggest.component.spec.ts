import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsuggestComponent } from './adminsuggest.component';

describe('AdminsuggestComponent', () => {
  let component: AdminsuggestComponent;
  let fixture: ComponentFixture<AdminsuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsuggestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
