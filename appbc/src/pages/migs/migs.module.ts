import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MigsPage } from './migs';

@NgModule({
  declarations: [
    MigsPage,
  ],
  imports: [
    IonicPageModule.forChild(MigsPage),
  ],
})
export class MigsPageModule {}
