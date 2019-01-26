import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FoodmapComponent } from './foodmap/foodmap.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FoodmapListComponent } from './foodmap/foodmap-list/foodmap-list.component';
import { FoodmapEditComponent } from './foodmap/foodmap-edit/foodmap-edit.component';
import { FoodmapDetailComponent } from './foodmap/foodmap-detail/foodmap-detail.component';
import { FoodmapItemComponent } from './foodmap/foodmap-list/foodmap-item/foodmap-item.component';
import { FoodMapService } from './foodmap/foodmap.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FilterPipe } from './common/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule, MatButtonModule, MatPaginatorModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FoodmapTableComponent } from './foodmap/foodmap-table/foodmap-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    FoodmapComponent,
    HomeComponent,
    HeaderComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    FoodmapListComponent,
    FoodmapEditComponent,
    FoodmapDetailComponent,
    FoodmapItemComponent,
    FilterPipe,
    FoodmapTableComponent
  ],
  entryComponents: [FoodmapEditComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRippleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [FoodMapService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
