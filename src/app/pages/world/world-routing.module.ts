import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldPage } from './world.page';

const routes: Routes = [
  {
    path: '',
    component: WorldPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldPageRoutingModule {}
