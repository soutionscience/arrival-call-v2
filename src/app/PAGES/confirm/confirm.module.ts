import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmPageRoutingModule } from './confirm-routing.module';

import { ConfirmPage } from './confirm.page';
import { TimeSlidersComponent } from 'src/app/COMPONENTS/time-sliders/time-sliders.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPageRoutingModule
   
  ],
  // providers:[TimeSlidersComponent],
  declarations: [ConfirmPage, TimeSlidersComponent]
})
export class ConfirmPageModule {}
