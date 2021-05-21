import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListModalPage } from './list-modal';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ListModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ListModalPage),
    Ionic2RatingModule
  ],
})
export class ListModalPageModule {}
