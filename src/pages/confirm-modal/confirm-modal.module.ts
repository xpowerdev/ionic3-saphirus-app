import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmModalPage } from './confirm-modal';

@NgModule({
  declarations: [
    ConfirmModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmModalPage),
  ],
})
export class ConfirmModalPageModule {}
