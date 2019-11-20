import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullmarketComponent } from './fullmarket/fullmarket.component';
import { InplayComponent } from './inplay/inplay.component';
import { AccountComponent } from './account/account.component';
import { SportsComponent } from './sports/sports.component';
import { MybetsComponent } from './mybets/mybets.component';
import { MarketresultComponent } from './marketresult/marketresult.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { RulesComponent } from './rules/rules.component';
import { ReportsComponent } from './reports/reports.component';
import { ActivityComponent } from './activity/activity.component';
import { AccountstatementComponent } from './accountstatement/accountstatement.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProfitlossComponent } from './profitloss/profitloss.component';
import { EditstakeComponent } from './editstake/editstake.component';



const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'fullmarket',component:FullmarketComponent},
  {path:'sports',component:SportsComponent},
  {path:'inplay',component:InplayComponent},
  {path:'account',component:AccountComponent},
  {path:'mybets',component:MybetsComponent},
  {path:'marketresult',component:MarketresultComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'rules',component:RulesComponent},
  {path:'reports',component:ReportsComponent},
  {path:'activity',component:ActivityComponent},
  {path:'accountstat',component:AccountstatementComponent},
  {path:'profitloss',component:ProfitlossComponent},
  {path:'transactions',component:TransactionsComponent},
  {path:'editstake',component:EditstakeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const componentrouting=[
                              HomeComponent,
                              FullmarketComponent,
                              InplayComponent,
                              AccountComponent,
                              SportsComponent,
                              MybetsComponent,
                              MarketresultComponent,
                              ChangepasswordComponent,
                              RulesComponent,
                              ReportsComponent,
                              ActivityComponent,
                              AccountstatementComponent,
                              TransactionsComponent,
                              ProfitlossComponent,
                              EditstakeComponent
                            ]