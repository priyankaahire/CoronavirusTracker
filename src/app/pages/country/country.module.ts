import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryPage } from './country.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CountryPageRoutingModule } from './country-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: CountryPage }]),
    CountryPageRoutingModule,
  ],
  declarations: [CountryPage]
})
export class CountryPageModule {}
