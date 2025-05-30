import { RouterModule, Routes } from '@angular/router';
// import { DemoComponent } from './pages/demo/demo.component';
import { HooksComponent } from './pages/hooks/hooks.component';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './Services/auth.guard';
import { TreeViewComponent } from './pages/tree-view/tree-view.component';
import { BarChartComponent } from './pages/bar-chart/bar-chart.component';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
import { UsersComponent } from './pages/users/users.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ParentComponent } from './pages/data-communicate/parent/parent.component';
import { ChildComponent } from './pages/data-communicate/child/child.component';
import { Child2Component } from './pages/data-communicate/child2/child2.component';
import { Parent2Component } from './pages/data-communicate/parent2/parent2.component';
import { SenderComponent } from './pages/data-communicate/sender/sender.component';
import { ReceiverComponent } from './pages/data-communicate/receiver/receiver.component';
import { DatabindingComponent } from './pages/databinding/databinding.component';
import { DataTreeComponent } from './pages/treeData/data-tree.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'employee', component: EmployeeComponent, canActivate: [authGuard] },
    { path: 'hooks', component: HooksComponent, canActivate: [authGuard] },
    { path: 'databinding', component: DatabindingComponent, canActivate: [authGuard] },
    { path: 'tree-view', component: TreeViewComponent, canActivate: [authGuard] },
    { path: 'tree', component: DataTreeComponent, canActivate: [authGuard] },
    { path: 'barchart', component: BarChartComponent, canActivate: [authGuard] },
    { path: 'piechart', component: PieChartComponent, canActivate: [authGuard] },
    { path: 'users', component: UsersComponent, canActivate: [authGuard] },
    { path: 'parent', component: ParentComponent, canActivate: [authGuard] },
    { path: 'child', component: ChildComponent, canActivate: [authGuard] },
    { path: 'parent2', component: Parent2Component, canActivate: [authGuard] },
    { path: 'child2', component: Child2Component, canActivate: [authGuard] },
    { path: 'sender', component: SenderComponent, canActivate: [authGuard] },
    { path: 'receiver', component: ReceiverComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
];
