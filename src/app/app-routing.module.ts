import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'confirm',
    pathMatch:'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./PAGES/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./PAGES/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./PAGES/confirm/confirm.module').then( m => m.ConfirmPageModule)
  },
  {
    path: 'tracking',
    loadChildren: () => import('./PAGES/tracking/tracking.module').then( m => m.TrackingPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
