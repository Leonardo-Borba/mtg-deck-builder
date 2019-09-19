import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeckBoxComponent } from './deck-box/deck-box.component';
import { CardComponent } from './card/card.component'; 
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModuleModule } from '../shared/material-module/material-module.module';
import { CardTooltipComponent } from './card-tooltip/card-tooltip.component';
import { ManaCostComponent } from './card/mana-cost/mana-cost.component';
import { MassImportComponent } from './mass-import/mass-import.component';
import { DecklistComponent } from './decklist/decklist.component';

@NgModule({
  declarations: [SearchComponent, DeckBoxComponent, CardComponent, CardTooltipComponent, ManaCostComponent, MassImportComponent, DecklistComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModuleModule,
    BrowserAnimationsModule,
    DirectivesModule,
    PipesModule,
    SharedModule,
    
  ],
   exports: [SearchComponent],
  entryComponents: [CardTooltipComponent]
})
export class DeckBuildingModule { }
