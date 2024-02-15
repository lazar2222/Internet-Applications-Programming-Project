import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P401Component } from './p401.component';

describe('P401Component', () => {
  let component: P401Component;
  let fixture: ComponentFixture<P401Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P401Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
