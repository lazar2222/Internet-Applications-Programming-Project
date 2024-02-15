import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshoppageComponent } from './workshoppage.component';

describe('WorkshoppageComponent', () => {
  let component: WorkshoppageComponent;
  let fixture: ComponentFixture<WorkshoppageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshoppageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshoppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
