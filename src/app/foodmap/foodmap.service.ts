import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FoodMap } from './foodmap.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()
export class FoodMapService {
  private dbPath = '/FoodMap';
  foodmapsRef: AngularFireList<FoodMap> = null;

  constructor(private db: AngularFireDatabase) {
    this.foodmapsRef = db.list(this.dbPath);
  }

  FoodMapsChanged = new Subject<FoodMap[]>();
  FoodMapAdded = new Subject<FoodMap>();
  private foodmaps: FoodMap[];

  getFoodmaps(): AngularFireList<FoodMap> {
    return this.foodmapsRef;
  }

  createFoodmap(foodmap: FoodMap): void {
    this.foodmapsRef.push(foodmap);
  }

  updateFoodmap(key: string, value: any): void {
    this.foodmapsRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteFoodmap(key: string): void {
    this.foodmapsRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
