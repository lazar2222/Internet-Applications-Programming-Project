import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginrecComponent } from './beginrec.component';

describe('BeginrecComponent', () => {
  let component: BeginrecComponent;
  let fixture: ComponentFixture<BeginrecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeginrecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeginrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
