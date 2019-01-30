import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import { map } from 'rxjs/operators';
import { FoodMapService } from '../foodmap/foodmap.service';
import { FoodMap } from '../foodmap/foodmap.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('chart')
  public refChart: ElementRef;

  public chartData: any;

  foodmaps: Array<FoodMap>;

  countries = [];

  usac = 0;
  indiac = 0;
  japanc = 0;
  brazilc = 0;
  chinac = 0;

  public constructor(private foodMapService: FoodMapService) {}

  public ngOnInit() {
    this.getFoodmaps();
    // this.foodMapService.fetchFoodMaps().subscribe(response => {
    //   this.foodmaps = (Object as any).values(response);
    //   console.log(this.foodmaps);
    // });
  }

  getFoodmaps() {
    this.foodMapService
      .getFoodmaps()
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe(foodmaps => {
        this.foodmaps = foodmaps;
        for (let i = 0; i < this.foodmaps.length; i++) {
          this.countries.push(this.foodmaps[i].country);
        }
        for (let j = 0; j < this.countries.length; j++) {
          if (this.countries[j] === 'USA') {
            this.usac = this.usac + 1;
          } else if (this.countries[j] === 'India') {
            this.indiac = this.indiac + 1;
          } else if (this.countries[j] === 'Japan') {
            this.japanc = this.japanc + 1;
          } else if (this.countries[j] === 'Brazil') {
            this.brazilc = this.brazilc + 1;
          } else if (this.countries[j] === 'China') {
            this.chinac = this.chinac + 1;
          }
        }
        const chart = this.refChart.nativeElement;
        const ctx = chart.getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['USA', 'India', 'Japan', 'Brazil', 'China'],
            datasets: [
              {
                label: 'FoodMaps',
                backgroundColor: ['#F7DC6F', '#E74C3C', '#2ECC71', '#884EA0', '#2E86C1'],
                data: [this.usac, this.indiac, this.japanc, this.brazilc, this.chinac]
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'FoodMaps around the World'
            },
            animation: {
              animateRotate: true,
              animateScale: true
            }
          }
        });
      });
  }
}
