import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeLoaderComponent } from './recipe-loader.component';

describe('RecipeLoaderComponent', () => {
  let component: RecipeLoaderComponent;
  let fixture: ComponentFixture<RecipeLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
