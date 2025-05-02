import { RouterModule, Routes } from '@angular/router';
// import { DemoComponent } from './pages/demo/demo.component';
import { HooksComponent } from './pages/hooks/hooks.component';
import { DataBindingComponent } from './pages/data-binding/data-binding.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from '../app/auth.guard';
import { TreeViewComponent } from './pages/tree-view/tree-view.component';
import { BarChartComponent } from './pages/bar-chart/bar-chart.component';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
import { UsersComponent } from './pages/users/users.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { MainComponent } from './pages/main/main.component';
import { ParentMainComponent } from './pages/parent-main/parent-main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'employee', component: EmployeeComponent, canActivate: [authGuard] },
    { path: 'hooks', component: HooksComponent, canActivate: [authGuard] },
    { path: 'data', component: DataBindingComponent, canActivate: [authGuard] },
    { path: 'tree-view', component: TreeViewComponent, canActivate: [authGuard] },
    { path: 'barchart', component: BarChartComponent, canActivate: [authGuard] },
    { path: 'piechart', component: PieChartComponent, canActivate: [authGuard] },
    { path: 'users', component: UsersComponent, canActivate: [authGuard] },
    { path: 'main/:id/:msg', component: MainComponent, canActivate: [authGuard] },
    { path: 'Parent', component: ParentMainComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    // { path: '**', redirectTo: '/login' }
];
