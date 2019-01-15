import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { FoodmapComponent } from './foodmap/foodmap.component';
import { FoodmapEditComponent } from './foodmap/foodmap-edit/foodmap-edit.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';







const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {path : 'foodmaps', component: FoodmapComponent},

  {path : 'signup', component: SignupComponent},
  {path : 'signin', component: SigninComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
