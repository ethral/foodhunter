import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodmapComponent } from './foodmap.component';

describe('FoodmapComponent', () => {
  let component: FoodmapComponent;
  let fixture: ComponentFixture<FoodmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
