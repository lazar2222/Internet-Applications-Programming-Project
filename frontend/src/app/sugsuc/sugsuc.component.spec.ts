import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugsucComponent } from './sugsuc.component';

describe('SugsucComponent', () => {
  let component: SugsucComponent;
  let fixture: ComponentFixture<SugsucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugsucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SugsucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
