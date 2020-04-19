import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [{
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    data: {
        title: 'เข้าสู่ระบบ'
    }
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
