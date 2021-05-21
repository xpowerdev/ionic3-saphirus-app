import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { ProfilePage } from './profile';

import { ComponentsModule } from './../../components/components.module';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    ComponentsModule,
    PipesModule
  ],
  providers: [
    Camera,
    FileTransfer,
    FileTransferObject,
    File
  ]
})
export class ProfilePageModule {}
