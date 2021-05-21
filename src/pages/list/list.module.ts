import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { Geolocation } from '@ionic-native/geolocation';

import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
    ComponentsModule,
  ],
  providers: [
    Geolocation
  ]
})
export class ListPageModule {}
