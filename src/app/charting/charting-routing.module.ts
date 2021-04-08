import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartingComponent } from './charting.component';
import { ChartingDataResolver } from './charting.resolver';

const routes: Routes = [{ path: '', component: ChartingComponent, resolve:[ChartingDataResolver] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartingRoutingModule { }
