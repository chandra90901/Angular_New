import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from '../../src/app/demo/demo.component';
import { HooksComponent } from '../../src/app/hooks/hooks.component';
import { DataBindingComponent } from '../../src/app/data-binding/data-binding.component';

export const routes: Routes = [
    { path: '', redirectTo: '/demo', pathMatch: 'full' },
    { path: 'demo', component: DemoComponent },
    { path: 'hooks', component: HooksComponent },
    { path: 'data', component: DataBindingComponent }
];


