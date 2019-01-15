import { Component, OnInit,Input} from '@angular/core';
import { FoodMap } from '../../foodmap.model';
import { style,trigger,state, transition, animate,keyframes,group} from '@angular/animations';

@Component({
  selector: 'app-foodmap-item',
  templateUrl: './foodmap-item.component.html',
  styleUrls: ['./foodmap-item.component.css'],
  animations:[
    
    
    trigger('list1',[
      state('in',style({
        opacity:1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform:'translateX(-100px)'

        }),
        animate(300)]),
      transition('* => void', [
          
          animate(300,style({
            transform: 'translateX(100px)',
            opacity:0

          }))])


    ])
    // trigger('list2',[
    //   state('in',style({
    //     opacity:1,
    //     transform: 'translateX(0)'
    //   })),
    //   state('highlighted',style({
    //     'background-color':'blue',
    //     transform: 'translateX(100px)'
    //   })),
    //   transition('void => *', [
    //     animate(1000,keyframes([
    //       style({
    //         transform: 'transalateX(-100px)',
    //         opacity:0,
    //         offset:0
    //       }),
    //       style({
    //         transform: 'transalateX(-50px)',
    //         opacity:0.5,
    //         offset:0.3
    //       }),
    //       style({
    //         transform: 'transalateX(-20px)',
    //         opacity:1,
    //         offset:0.8
    //       }),
    //       style({
    //         transform: 'transalateX(0px)',
    //         opacity:1,
    //         offset:1
    //       })
    //     ]))
    //   ]),
    //   transition('* => void', [
    //      group([
    //       animate(300,style({
    //         'color':'red'
  
    //       })),  
    //       animate(800,style({
    //           transform: 'translateX(100px)',
    //           opacity:0
  
    //         }))

    //      ]) 
    //     ])


    // ])

  ]
})
export class FoodmapItemComponent implements OnInit {


  @Input() foodmap: FoodMap;
  @Input() index: number;
 

  constructor() { }

  ngOnInit() {
  }
  setRatingClass(foodmap: {name: string, description: string, streetAddress: string, city: string, state: string, country: string , rating: number}) {
    return {
      'list-group-item-success': foodmap.rating >= 3,
      //'list-group-item-warning': foodmap.rating === 4,
      'list-group-item-danger': (foodmap.rating >=0 && foodmap.rating <=2)
    };
  }
 

}
