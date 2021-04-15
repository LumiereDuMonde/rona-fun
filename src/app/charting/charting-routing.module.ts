import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ChartingComponent } from './charting.component';
import { ChartingDataResolver } from './charting.resolver';

const routes: Routes = [{ path: '', component: ChartingComponent,canActivate: [AuthGuard], resolve:[ChartingDataResolver] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartingRoutingModule { }
