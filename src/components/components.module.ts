import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MItem1Component } from './m-item1/m-item1';
import { Ionic2RatingModule } from 'ionic2-rating';
import { MainHeaderComponent } from './main-header/main-header';
import { SubHeader1Component } from './sub-header1/sub-header1';
import { SubHeader2Component } from './sub-header2/sub-header2';
import { SubHeader3Component } from './sub-header3/sub-header3';
import { MItem2Component } from './m-item2/m-item2';
import { MItem3Component } from './m-item3/m-item3';
import { MItem4Component } from './m-item4/m-item4';
import { PipesModule } from './../pipes/pipes.module';
@NgModule({
	declarations: [
		MItem1Component,
		MainHeaderComponent,
		SubHeader1Component,
		SubHeader2Component,
		SubHeader3Component,
		MItem2Component,
		MItem3Component,
		MItem4Component,
	],
	imports: [
		IonicModule,
		Ionic2RatingModule,
		PipesModule
	],
	exports: [
		MItem1Component,
		MainHeaderComponent,
		SubHeader1Component,
		SubHeader2Component,
		SubHeader3Component,
		MItem2Component,
		MItem3Component,
    	MItem4Component,
	],
})
export class ComponentsModule {}
