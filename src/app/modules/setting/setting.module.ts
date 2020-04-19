import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingComponent } from './pages/setting/setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { ControlSensorComponent } from './pages/component/control-sensor/control-sensor.component';
import { ParkingManageComponent } from './pages/component/parking-manage/parking-manage.component';
import { ShareModule } from 'src/app/shared/share.module';
import { SettingService } from './service/setting.service';
import { ParkingRowComponent } from './pages/component/parking-row/parking-row.component';
import { ParkingBoxComponent } from './pages/component/parking-box/parking-box.component';
import { ParkingSettingComponent } from './pages/component/parking-setting/parking-setting.component';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    ShareModule,
  ],
  declarations: [
    SettingComponent,
    ControlSensorComponent,
    ParkingManageComponent,
    ParkingRowComponent,
    ParkingBoxComponent,
    ParkingSettingComponent,
  ],
  providers:[
    SettingService
  ]
})
export class SettingModule { }
