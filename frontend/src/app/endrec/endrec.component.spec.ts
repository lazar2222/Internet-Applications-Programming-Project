import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndrecComponent } from './endrec.component';

describe('EndrecComponent', () => {
  let component: EndrecComponent;
  let fixture: ComponentFixture<EndrecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndrecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
