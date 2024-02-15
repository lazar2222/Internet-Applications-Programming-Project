import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastworkshopsComponent } from './pastworkshops.component';

describe('PastworkshopsComponent', () => {
  let component: PastworkshopsComponent;
  let fixture: ComponentFixture<PastworkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastworkshopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastworkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
