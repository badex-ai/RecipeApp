import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedDetailComponent } from './liked-detail.component';

describe('LikedDetailComponent', () => {
  let component: LikedDetailComponent;
  let fixture: ComponentFixture<LikedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
