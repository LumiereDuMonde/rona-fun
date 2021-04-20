import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemeComponent } from './meme.component';

const routes: Routes = [{ path: '', component: MemeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemeRoutingModule { }
