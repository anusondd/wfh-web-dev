import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WfhComponent } from './pages/wfh/wfh.component';

const routes: Routes = [{
  path: '',
  component: WfhComponent,
  pathMatch: 'full',
  data: {
    title: 'wfh'
  }
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class WfhRoutingModule { }
