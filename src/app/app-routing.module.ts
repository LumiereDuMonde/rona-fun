import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/charting', pathMatch: 'full' },  
  { path: 'charting', loadChildren: () => import('./charting/charting.module').then(m => m.ChartingModule) },
  { path: 'meme', loadChildren: () => import('./meme/meme.module').then(m => m.MemeModule) }  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
