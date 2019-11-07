import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullmarketComponent } from './fullmarket/fullmarket.component';
import { InplayComponent } from './inplay/inplay.component';
import { AccountComponent } from './account/account.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { SportsComponent } from './sports/sports.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'fullmarket',component:FullmarketComponent},
  {path:'sports',component:SportsComponent},
  {path:'inplay',component:InplayComponent},
  {path:'favourites',component:FavouritesComponent},
  {path:'account',component:AccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const componentrouting=[
                              HomeComponent,
                              FullmarketComponent,
                              InplayComponent,
                              AccountComponent,
                              FavouritesComponent,
                              SportsComponent,
                            ]