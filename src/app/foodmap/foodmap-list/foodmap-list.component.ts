import { Component, OnInit, OnDestroy } from '@angular/core';


import { Subscription, Subject } from 'rxjs';
import { FoodMap } from '../foodmap.model';
import { FoodMapService } from '../foodmap.service';

@Component({
  selector: 'app-foodmap-list',
  templateUrl: './foodmap-list.component.html',
  styleUrls: ['./foodmap-list.component.css']
})
export class FoodmapListComponent implements OnInit, OnDestroy {
  foodmaps: FoodMap[];
  foodmapRefreshsubscription: Subscription;
  filteredStatus='';
  foodmapAddedSubscription: Subscription;

 

  constructor(private FoodMapService: FoodMapService) {
  }

  ngOnInit() {

    //on page initialization - list is loaded
    this.FoodMapService.fetchFoodMaps().subscribe(
      (response) => {
        this.foodmaps = (Object as any).values(response);
        console.log(this.foodmaps);
      }
    );
     
    this.foodmapRefreshsubscription = this.FoodMapService.FoodMapsChanged.subscribe(
      (foodmaps: FoodMap[]) => {

        this.foodmaps = foodmaps;

        console.log('The subscription has been received',this.foodmaps);
      }
    );


    this.foodmapAddedSubscription = this.FoodMapService.FoodMapAdded.subscribe(
      (foodmap: FoodMap)=> {
        this.foodmaps.push(foodmap);
      }
    );
    
  }



  getFoodMaps(){
    this.FoodMapService.fetchFoodMaps().subscribe(
      (response) => {
        this.foodmaps = (Object as any).values(response);
        console.log(this.foodmaps);
      }
    );

    this.FoodMapService.FoodMapsChanged.next(this.foodmaps.slice());
    
  }

  

 

  ngOnDestroy() {
    this.foodmapRefreshsubscription.unsubscribe();
    this.foodmapAddedSubscription.unsubscribe();
  }
}


