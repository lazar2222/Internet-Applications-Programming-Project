import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentworkshopsComponent } from './currentworkshops.component';

describe('CurrentworkshopsComponent', () => {
  let component: CurrentworkshopsComponent;
  let fixture: ComponentFixture<CurrentworkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentworkshopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentworkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
