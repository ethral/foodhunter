import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FoodMap } from './foodmap.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class FoodMapService {
  private dbPath = '/FoodMap';
  // roles of currently logged in user
  userRoles: Array<string>;
  foodmapsRef: AngularFireList<FoodMap> = null;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.foodmapsRef = db.list(this.dbPath);
    auth.user
      .pipe(
        map(user => {
          // Set an array of user roles

          return (this.userRoles = _.keys(_.get(user, 'roles')));
        })
      )
      .subscribe();
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

  get canRead(): boolean {
    const allowed = ['admin', 'author', 'reader'];
    return this.matchingRole(allowed);
  }

  get canEdit(): boolean {
    const allowed = ['admin', 'author'];
    return this.matchingRole(allowed);
  }

  get canDelete(): boolean {
    const allowed = ['admin'];
    return this.matchingRole(allowed);
  }

  /// Helper to determine if any matching roles exist

  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }

  private handleError(error) {
    console.log(error);
  }
}
