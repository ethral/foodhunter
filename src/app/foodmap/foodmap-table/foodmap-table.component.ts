import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { FoodmapEditComponent } from '../foodmap-edit/foodmap-edit.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FoodMap } from '../foodmap.model';
import { FoodMapService } from '../foodmap.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

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
  selection = new SelectionModel<FoodMap>(false, []);
  editMode = false;
  adminMode = true;

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

  displayedColumnsRead: string[] = [
    'name',
    'description',
    'streetAddress',
    'city',
    'state',
    'country',
    'rating'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private foodMapService: FoodMapService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user) {
        user.roles.reader ? (this.adminMode = false) : (this.adminMode = true);
      }
    });

    // on page initialization - list is loaded
    this.getFoodmaps();
    // this.foodMapService.fetchFoodMaps().subscribe(response => {
    //   this.foodmaps = (Object as any).values(response);
    //   console.log(this.foodmaps);
    //   this.dataSource = new MatTableDataSource(this.foodmaps);
    // });
    // setTimeout(() => {
    // }, 200);

    // this.foodmapAddedSubscription = this.foodMapService.FoodMapAdded.subscribe(
    //   (foodmap: FoodMap) => {
    //     this.foodmaps.push(foodmap);
    //     this.dataSource = new MatTableDataSource(this.foodmaps);

    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   }
    // );
    this.selection.changed.subscribe(data => {
      this.editMode = this.selection.selected.length > 0 ? true : false;
    });
  }

  getFoodmaps() {
    this.foodMapService
      .getFoodmaps()
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe(foodmaps => {
        this.foodmaps = foodmaps;
        this.dataSource = new MatTableDataSource(this.foodmaps);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.foodmaps);
      });
  }

  deleteFoodmap(key: string) {
    this.foodMapService.deleteFoodmap(key);
    this.openSnackBar();
    this.selection.clear();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(): void {
    if (this.editMode) {
      const dialogRef = this.dialog.open(FoodmapEditComponent, {
        width: '400px',
        data: {
          selection: this.selection.selected,
          editMode: this.editMode
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.selection.clear();
        console.log('The edit dialog was closed');
      });
    } else {
      const dialogRef = this.dialog.open(FoodmapEditComponent, {
        width: '400px'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The new dialog was closed');
      });
    }
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

  openSnackBar() {
    this.snackBar.open('Data has successfully been deleted!!', '', {
      duration: 2000
    });
  }
}
