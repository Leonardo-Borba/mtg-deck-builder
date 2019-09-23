import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { DeckBuildingModule } from './deck-building/deck-building.module';
import { HttpClientModule } from '@angular/common/http';
import { CardImageDirective } from './directives/card-image.directive';
import { FooterComponent } from './footer/footer.component';
import {FooterModule} from './footer/footer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    DeckBuildingModule,
    HttpClientModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
