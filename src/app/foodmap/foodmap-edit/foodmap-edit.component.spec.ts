import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodmapEditComponent } from './foodmap-edit.component';

describe('FoodmapEditComponent', () => {
  let component: FoodmapEditComponent;
  let fixture: ComponentFixture<FoodmapEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodmapEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodmapEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
