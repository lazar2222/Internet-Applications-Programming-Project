import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucrecComponent } from './sucrec.component';

describe('SucrecComponent', () => {
  let component: SucrecComponent;
  let fixture: ComponentFixture<SucrecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucrecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
