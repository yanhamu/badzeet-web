import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const modules = [MatFormFieldModule, MatInputModule, MatButtonModule];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: modules,
})
export class AppMaterialModule {}
