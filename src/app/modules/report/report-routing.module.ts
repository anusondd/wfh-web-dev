import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './pages/report/report.component';

const routes: Routes = [{
  path: '',
  component: ReportComponent,
  data: {
    title: 'ระบบรายงาน'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
