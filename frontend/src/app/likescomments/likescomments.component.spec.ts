import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikescommentsComponent } from './likescomments.component';

describe('LikescommentsComponent', () => {
  let component: LikescommentsComponent;
  let fixture: ComponentFixture<LikescommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikescommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikescommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
