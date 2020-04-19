import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule, TooltipModule, ModalModule } from 'ngx-bootstrap';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

import { FontAwesomeModule } from 'ngx-icons';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { ValidationFieldGroupComponent } from './components/validation-field-group/validation-field-group.component';
import { ValidationFormComponent } from './components/validation-form/validation-form.component';
import { ValidationMessageService } from './components/validation-message/validation-message.service';
import { NgxBootstrapModule } from './module/ngx-bootstrap/ngx-bootstrap.module';
import { StreamDataService } from './services/stream-data.service';
import { NotificationService } from './services/notification.service';
import { SensorStatsComponent } from './components/sensor-stats/sensor-stats.component';
import { ParkingStatsComponent } from './components/parking-stats/parking-stats.component';
import { ReportService } from './services/report.service';
import { CalculateDateService } from './services/calculate-date.service';
import { ParkingStatsService } from './services/parking-stats.service';

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CounterStateComponent } from './components/counter-state/counter-state.component';
export const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json")
}


const _IMPORT_OTHERS = [
    /* import other lib at here */
    NgSelectModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot()
];

const _EXPORTS = [
    /* export at here */
    // Module
    NgSelectModule
    // Component

    // Pipe

    // Directive
];

const _DECLARATIONS = [
    /* declaration shared component at here */

    // Component

    // Pipe

    // Directive
];

const _PROVIDERS = [
    AuthGuard,
    LoginGuard,
    AuthService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    },
    /* provider service at here */
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        _IMPORT_OTHERS,
        NgxBootstrapModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            },
            isolate: false
        })
    ],
    exports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        _EXPORTS,
        ValidationMessageComponent,
        ValidationFieldGroupComponent,
        ValidationFormComponent,
        NgxBootstrapModule,
        SensorStatsComponent,
        ParkingStatsComponent,
        TranslateModule,
        CounterStateComponent,
    ],
    declarations: [
        _DECLARATIONS,
        ValidationMessageComponent,
        ValidationFieldGroupComponent,
        ValidationFormComponent,
        SensorStatsComponent,
        ParkingStatsComponent,
        CounterStateComponent,
    ],
    providers: [
        _PROVIDERS,
        ValidationMessageService,
        StreamDataService,
        NotificationService,
        ReportService,
        CalculateDateService,
        ParkingStatsService,
    ],
})
export class ShareModule { }
