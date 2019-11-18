import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,componentrouting } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Materialmodule } from './materialmodule';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CustomcellrendrerComponent } from './customcellrendrer/customcellrendrer.component';




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
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Materialmodule,
    AgGridModule.withComponents([]),
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  entryComponents:[CustomcellrendrerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
