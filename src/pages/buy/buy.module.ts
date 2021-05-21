import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyPage } from './buy';

import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    BuyPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyPage),
    ComponentsModule
  ],
})
export class BuyPageModule {}
