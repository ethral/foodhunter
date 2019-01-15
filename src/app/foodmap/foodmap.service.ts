
import { HttpClient,HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { FoodMap } from "./foodmap.model";


@Injectable()

export class FoodMapService{

    constructor(private httpClient : HttpClient){}

   FoodMapsChanged = new Subject<FoodMap[]>();
   FoodMapAdded = new Subject<FoodMap>();
    private foodmaps : FoodMap[] = [
        new FoodMap('Biryani Pointe','A bustling biryani joint for and by the Indians','123 Hungry Way','Catonsville','MD','USA',4),
        new FoodMap('McDonalds','The best burger joint in all of the MD','123 Ketchup Way','Owings Mills','MD','USA',3),
        new FoodMap('Yogort','A bustling biryani joint for and by the Indians','123 Hungry Way','Catonsville','MD','USA',4),
        new FoodMap('KebabInn','The best burger joint in all of the MD','123 Ketchup Way','Owings Mills','MD','USA',3)

    ]




    // getFoodMaps() {
    //     return this.foodmaps.slice();
    //   }


      saveFoodMaps(foodmaps: FoodMap[]){
        //const token = this.authService.getToken();
        

        return this.httpClient.put<FoodMap[]>('https://foodhunter-db.firebaseio.com/FoodMap.json',foodmaps);


        // const req = new HttpRequest('PUT','https://foodhunter-db.firebaseio.com/FoodMap.json',this.foodmapService.getFoodMaps());

        // console.log(req);

        // return this.httpClient.request(req);
    }

    saveFoodMap(foodmap: FoodMap){
        
        return this.httpClient.post<FoodMap>('https://foodhunter-db.firebaseio.com/FoodMap.json',foodmap);

    }


    fetchFoodMaps(){

       return this.httpClient.get<FoodMap[]>('https://foodhunter-db.firebaseio.com/FoodMap.json');
           
       

        

        

    

    }

    
}














