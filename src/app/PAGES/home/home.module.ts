import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ConfirmActionSheetComponent } from 'src/app/COMPONENTS/confirm-action-sheet/confirm-action-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  
  ],
  entryComponents: [ConfirmActionSheetComponent],
  providers:[Geolocation],
  declarations: [HomePage, ConfirmActionSheetComponent]
})
export class HomePageModule {}
