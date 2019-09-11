import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckBuildingModule } from './deck-building/deck-building.module';
import { DeckBoxComponent } from './deck-building/deck-box/deck-box.component';

const routes: Routes = [
  {
    path: "",
    component: DeckBoxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DeckBuildingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
