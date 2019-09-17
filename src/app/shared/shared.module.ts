import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { MaterialModuleModule } from './material-module/material-module.module';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [ModalDialogComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    MaterialModuleModule
  ],
  exports: [ModalDialogComponent,LoadingSpinnerComponent],
  entryComponents:[ModalDialogComponent,LoadingSpinnerComponent]
})
export class SharedModule { }
