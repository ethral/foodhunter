import { Component, OnInit,ViewChild,Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FoodMap } from '../foodmap.model';
import { FoodMapService } from '../foodmap.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-foodmap-edit',
  templateUrl: './foodmap-edit.component.html',
  styleUrls: ['./foodmap-edit.component.css']
})
export class FoodmapEditComponent implements OnInit {
  @ViewChild('f') slForm : NgForm;
  foodmaps : FoodMap[];
  editMode =  false;

  constructor(private foodmapService: FoodMapService,public dialogRef: MatDialogRef<FoodmapEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FoodMap,public snackBar: MatSnackBar) { }

  ngOnInit() { }

  onSubmitItem(form : NgForm) {
    const value = form.value;
    const newFoodMap = new FoodMap(value.name, value.description , value.streetAddress,value.city,value.state,value.country,value.rating);
    this.foodmapService.saveFoodMap(newFoodMap).subscribe(
    (foodmap)=> console.log('The saved foodmap: ',foodmap)
    );
    this.foodmapService.FoodMapAdded.next(newFoodMap);
    form.reset();
    this.dialogRef.close();
    this.openSnackBar();
}

onNoClick(): void {
  this.dialogRef.close();
}
openSnackBar() {
  this.snackBar.open('Data has successfully been posted!!', '', {
    duration: 2000
  });
}

onClear(){
  this.slForm.reset();
  this.editMode =false;
}
}

