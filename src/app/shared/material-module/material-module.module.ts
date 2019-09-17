import { NgModule } from '@angular/core';
import { MatButtonModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatGridListModule, MatIconModule } from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  exports: [ 
    MatDialogModule,
    MatButtonModule, 
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    MatGridListModule,
    MatButtonModule, 
    MatIconModule,
    MatProgressSpinnerModule]
})
export class MaterialModuleModule { }
