import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveworkshopsComponent } from './activeworkshops.component';

describe('ActiveworkshopsComponent', () => {
  let component: ActiveworkshopsComponent;
  let fixture: ComponentFixture<ActiveworkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveworkshopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveworkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
