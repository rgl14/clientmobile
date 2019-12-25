import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule,componentrouting } from './app-routing.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Materialmodule } from './materialmodule';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap';
import { CustomcellrendrerComponent } from './customcellrendrer/customcellrendrer.component';
import { CommonService } from 'src/services/common.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';
import { HttpCacheService } from 'src/services/cache.service';
import { AuthinterceptorService } from './authinterceptor.service';
import { SharedataService } from './sharedata.service';
import { MarketsService } from './markets.service';
import { FancyService } from './fancy.service';
import { SignalrService } from './signalr.service';
import { DataFormatService } from './data-format.service';
import { PlaceBetsService } from './place-bets.service';
import { SortByDatePipe } from './oderBypipe';
import { ReplacePipe } from './main/replacepipe';
import { RemoveSpacePipe } from './Directives/removespace';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ScoreboardService } from './scoreboard.service';
import { SearchComponent } from './search/search.component';
import { SwipeTabDirective } from './directive/swipe-tab.directive';
import * as Hammer from "hammerjs";
import { PnlbetsComponent } from './pnlbets/pnlbets.component';

export class HammerConf extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
    pinch: { enable: false },
    rotate: { enable: false }
  };

  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: "pan-y"
    });
    return mc;
  }
}


@NgModule({
  declarations: [
    AppComponent,
    componentrouting,
    HeaderComponent,
    FooterComponent,
    CustomcellrendrerComponent,
    SortByDatePipe,
    ReplacePipe,
    RemoveSpacePipe,
    SearchComponent,
    SwipeTabDirective,
    PnlbetsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Materialmodule,
    AgGridModule.withComponents([]),
    BsDatepickerModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    CarouselModule,
    FontAwesomeModule,
    FlexLayoutModule,
  ],
  providers: [AuthGuard,CommonService,CookieService,SharedataService,HttpCacheService,MarketsService,FancyService,SignalrService,DataFormatService,PlaceBetsService,ScoreboardService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthinterceptorService,
      multi:true
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConf
    }
  ],
  entryComponents:[CustomcellrendrerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
