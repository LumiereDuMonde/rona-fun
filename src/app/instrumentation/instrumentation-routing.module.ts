import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentationComponent } from './instrumentation.component';

const routes: Routes = [{ path: '', component: InstrumentationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstrumentationRoutingModule { }
