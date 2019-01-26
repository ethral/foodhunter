import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';

import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { FoodmapEditComponent } from '../foodmap-edit/foodmap-edit.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, Subject } from 'rxjs';
import { FoodMap } from '../foodmap.model';
import { FoodMapService } from '../foodmap.service';

@Component({
  selector: 'app-foodmap-table',
  templateUrl: './foodmap-table.component.html',
  styleUrls: ['./foodmap-table.component.css']
})
export class FoodmapTableComponent implements OnInit {
  foodmaps: FoodMap[];
  foodmapRefreshsubscription: Subscription;
  filteredStatus = '';
  foodmapAddedSubscription: Subscription;
  dataSource: MatTableDataSource<FoodMap>;
  selection = new SelectionModel<FoodMap>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private FoodMapService: FoodMapService, public dialog: MatDialog) {}

  ngOnInit() {
    //on page initialization - list is loaded
    this.FoodMapService.fetchFoodMaps().subscribe(response => {
      this.foodmaps = (Object as any).values(response);
      console.log(this.foodmaps);
      this.dataSource = new MatTableDataSource(this.foodmaps);
    });
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);

    this.foodmapAddedSubscription = this.FoodMapService.FoodMapAdded.subscribe(
      (foodmap: FoodMap) => {
        this.foodmaps.push(foodmap);
        this.dataSource = new MatTableDataSource(this.foodmaps);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  displayedColumns: string[] = [
    'select',
    'name',
    'description',
    'streetAddress',
    'city',
    'state',
    'country',
    'rating'
  ];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FoodmapEditComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
