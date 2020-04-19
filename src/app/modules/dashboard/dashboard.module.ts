import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ShareModule } from 'src/app/shared/share.module';
import { LinerChartComponent } from './component/liner-chart/liner-chart.component';
import { BarChartComponent } from './component/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LinerChartComponent,
    BarChartComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    DashboardRoutingModule,
    ShareModule
  ]
})
export class DashboardModule { }
