import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { MainComponent } from './shared/components/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
    data: { title: 'เข้าสู่ระบบ' },
    // canActivate: [LoginGuard],
  },
  {
    path: 'wfh',
    loadChildren: './modules/wfh/wfh.module#WfhModule',
    data: { title: 'work from home' },
    // canActivate: [LoginGuard],
  }, 
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
