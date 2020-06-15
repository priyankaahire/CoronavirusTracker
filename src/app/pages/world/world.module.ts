import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorldPage } from './world.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WorldPageRoutingModule } from './world-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    WorldPageRoutingModule
  ],
  declarations: [WorldPage]
})
export class WorldPageModule {}
