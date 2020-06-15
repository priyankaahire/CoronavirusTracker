import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'WorldTab',
        loadChildren: () => import('../world/world.module').then(m => m.WorldPageModule)
      },
      {
        path: 'CountryTab',
        loadChildren: () => import('../country/country.module').then(m => m.CountryPageModule)
      },
      {
        path: 'NewsTab',
        loadChildren: () => import('../news/news.module').then(m => m.NewsPageModule)
      },
      {
        path: 'GuidelinesTab',
        loadChildren: () => import('../guidelines/guidelines.module').then(m => m.GuidelinesPageModule)
      },
      {
        path: 'HelpTab',
        loadChildren: () => import('../help/help.module').then(m => m.HelpPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/WorldTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/WorldTab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
