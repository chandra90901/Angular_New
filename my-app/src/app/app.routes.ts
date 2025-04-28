import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './pages/demo/demo.component';
import { HooksComponent } from './pages/hooks/hooks.component';
import { DataBindingComponent } from './pages/data-binding/data-binding.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from '../app/auth.guard';
import { TreeViewComponent } from './pages/tree-view/tree-view.component';
import { BarChartComponent } from './pages/bar-chart/bar-chart.component';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'demo', component: DemoComponent, canActivate: [authGuard] },
    { path: 'hooks', component: HooksComponent, canActivate: [authGuard] },
    { path: 'data', component: DataBindingComponent, canActivate: [authGuard] },
    { path: 'tree-view', component: TreeViewComponent, canActivate: [authGuard] },
    { path: 'barchart', component: BarChartComponent, canActivate: [authGuard] },
    { path: 'piechart', component: PieChartComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '/login' }
];
