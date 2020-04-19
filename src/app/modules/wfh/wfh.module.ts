import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WfhComponent } from './pages/wfh/wfh.component';
import { WfhRoutingModule } from './wfh.routing.module';
import { ShareModule } from 'src/app/shared/share.module';

@NgModule({
  imports: [
    CommonModule,
    WfhRoutingModule,
    ShareModule
  ],
  declarations: [WfhComponent]
})
export class WfhModule { }
