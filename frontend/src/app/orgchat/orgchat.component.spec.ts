import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgchatComponent } from './orgchat.component';

describe('OrgchatComponent', () => {
  let component: OrgchatComponent;
  let fixture: ComponentFixture<OrgchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgchatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
