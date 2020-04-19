import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './pages/management/management.component';

const routes: Routes = [{
  path: '',
  component: ManagementComponent,
  data: {
    title: 'ระบบรายงาน'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }