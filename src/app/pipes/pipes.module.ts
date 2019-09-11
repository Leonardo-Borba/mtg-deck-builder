import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManaLinkPipe } from './manaLink/mana-link.pipe';
import { ObjectKeysPipe } from './object-keys.pipe';



@NgModule({
  declarations: [ManaLinkPipe, ObjectKeysPipe],
  imports: [
    CommonModule
  ],
  exports: [ManaLinkPipe, ObjectKeysPipe]
})
export class PipesModule { }
