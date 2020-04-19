import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './pages/management/management.component';
import { ManagementRoutingModule } from './management-routing.module';
import { ShareModule } from 'src/app/shared/share.module';

@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ShareModule,
  ],
  declarations: [ManagementComponent]
})
export class ManagementModule { }
