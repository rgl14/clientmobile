import { BrowserModule } from '@angular/platform-browser';
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





@NgModule({
  declarations: [
    AppComponent,
    componentrouting,
    HeaderComponent,
    FooterComponent,
    CustomcellrendrerComponent,
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
    CarouselModule,
    FontAwesomeModule,
    FlexLayoutModule,
  ],
  providers: [AuthGuard,CommonService,CookieService,SharedataService,HttpCacheService,MarketsService,FancyService,SignalrService,DataFormatService,PlaceBetsService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthinterceptorService,
      multi:true
    }],
  entryComponents:[CustomcellrendrerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
