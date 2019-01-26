import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodmapItemComponent } from './foodmap-item.component';

describe('FoodmapItemComponent', () => {
  let component: FoodmapItemComponent;
  let fixture: ComponentFixture<FoodmapItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FoodmapItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodmapItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
