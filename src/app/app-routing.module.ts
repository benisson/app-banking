import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
     path: '',
     pathMatch: 'full',
     redirectTo : 'home'
  },
  {
     path: 'home',
     loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'include-app',
    loadChildren: () => import('./include-app/include-app.module').then(mod => mod.IncludeAppModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
