import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderHistoryPage } from './order-history';

import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    OrderHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderHistoryPage),
    ComponentsModule
  ],
})
export class OrderHistoryPageModule {}
