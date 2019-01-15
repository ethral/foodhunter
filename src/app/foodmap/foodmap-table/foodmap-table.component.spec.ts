import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodmapTableComponent } from './foodmap-table.component';

describe('FoodmapTableComponent', () => {
  let component: FoodmapTableComponent;
  let fixture: ComponentFixture<FoodmapTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodmapTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodmapTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
