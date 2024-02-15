import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllworkshopsComponent } from './allworkshops.component';

describe('AllworkshopsComponent', () => {
  let component: AllworkshopsComponent;
  let fixture: ComponentFixture<AllworkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllworkshopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllworkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
