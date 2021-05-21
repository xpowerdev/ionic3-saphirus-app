import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { Geolocation } from '@ionic-native/geolocation';

import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    ComponentsModule
  ],

  providers: [
    Geolocation
  ]
})
export class MapPageModule {}
