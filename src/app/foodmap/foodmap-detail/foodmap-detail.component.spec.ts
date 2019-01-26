import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodmapDetailComponent } from './foodmap-detail.component';

describe('FoodmapDetailComponent', () => {
  let component: FoodmapDetailComponent;
  let fixture: ComponentFixture<FoodmapDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FoodmapDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodmapDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
