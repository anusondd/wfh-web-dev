import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule, BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxCheckboxModule } from 'ngx-checkbox';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    // CarouselModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    BsDropdownModule.forRoot(),
    NgxCheckboxModule
  ],
  declarations: [
    
  ],
  exports:[
    ModalModule,
    BsDatepickerModule,
    CarouselModule,
    NgxLoadingModule,
    BsDropdownModule,
    NgxCheckboxModule
  ]
})
export class NgxBootstrapModule { }
