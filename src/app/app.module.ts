import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule, createTranslateLoader } from './shared/share.module';
import { MainComponent } from './shared/components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// let token = localStorage.getItem('token');
// const config: SocketIoConfig = { url:environment.HOST_API, options: {  query: {token: token}} };
const config: SocketIoConfig = { url: environment.HOST_API, options: {} };

import { SnotifyModule, ToastDefaults, SnotifyService } from 'ng-snotify';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeFzMOM8J437ixF7Xggkd8t2hH_rPqCiQ",
  authDomain: "wfh-from.firebaseapp.com",
  databaseURL: "https://wfh-from.firebaseio.com",
  projectId: "wfh-from",
  storageBucket: "wfh-from.appspot.com",
  messagingSenderId: "434775202810",
  appId: "1:434775202810:web:5760c831eb3c4376036243",
  measurementId: "G-FSRVTHQD4T"
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([
    ]),
    NgxsStoragePluginModule.forRoot({}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ShareModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    SnotifyModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
