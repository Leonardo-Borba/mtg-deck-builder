import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { MaterialModuleModule } from './material-module/material-module.module';



@NgModule({
  declarations: [ModalDialogComponent],
  imports: [
    CommonModule,
    MaterialModuleModule
  ],
  exports: [ModalDialogComponent],
  entryComponents:[ModalDialogComponent]
})
export class SharedModule { }
