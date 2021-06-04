import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/charting', pathMatch: 'full' },  
  { path: 'charting', loadChildren: () => import('./charting/charting.module').then(m => m.ChartingModule) },
  { path: 'meme', loadChildren: () => import('./meme/meme.module').then(m => m.MemeModule) },
  { path: 'panel', loadChildren: () => import('./instrumentation/instrumentation.module').then(m => m.InstrumentationModule) },
  { path: 'trading', loadChildren: () => import('./trading/trading.module').then(m => m.TradingModule) },
  { path: 'map', loadChildren: () => import('./map/map.module').then(m => m.MapModule) },
  { path: '**', redirectTo: '/auth'}  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
