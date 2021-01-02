import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedItemComponent } from './liked-item.component';

describe('LikedItemComponent', () => {
  let component: LikedItemComponent;
  let fixture: ComponentFixture<LikedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
