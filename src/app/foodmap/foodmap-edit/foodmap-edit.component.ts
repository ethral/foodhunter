import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FoodMap } from '../foodmap.model';
import { FoodMapService } from '../foodmap.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-foodmap-edit',
  templateUrl: './foodmap-edit.component.html',
  styleUrls: ['./foodmap-edit.component.css']
})
export class FoodmapEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  foodmaps: FoodMap[];
  editMode = false;

  constructor(
    private foodmapService: FoodMapService,
    public dialogRef: MatDialogRef<FoodmapEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.data) {
    this.editMode = this.data.editMode;
    if (this.editMode) {
      console.log(this.data.selection);

      setTimeout(() => {
        this.slForm.setValue({
          name : this.data.selection[0].name,
          description : this.data.selection[0].description,
          streetAddress : this.data.selection[0].streetAddress,
          city : this.data.selection[0].city,
          state : this.data.selection[0].state,
          country : this.data.selection[0].country,
          rating : this.data.selection[0].rating
        });
      }, 10);
    }
    }
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newFoodMap = new FoodMap(
      value.name,
      value.description,
      value.streetAddress,
      value.city,
      value.state,
      value.country,
      value.rating
    );
    this.foodmapService
      .saveFoodMap(newFoodMap)
      .subscribe(foodmap => console.log('The saved foodmap: ', foodmap));
    this.foodmapService.FoodMapAdded.next(newFoodMap);
    form.reset();
    this.dialogRef.close();
    this.openSnackBar();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBar() {
    if (this.editMode) {
    this.snackBar.open('Data has successfully been updated!!', '', {
      duration: 2000
    });
  } else {
    this.snackBar.open('Data has successfully been posted!!', '', {
      duration: 2000
    });
  }
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
}
