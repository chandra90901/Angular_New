import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HoverHighlightDirective } from './hover-highlight.directive';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BarChartComponent } from './pages/bar-chart/bar-chart.component';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
import { DataBindingComponent } from './pages/data-binding/data-binding.component';
import { DemoComponent } from './pages/demo/demo.component';
import { TreeViewComponent } from './pages/tree-view/tree-view.component';
import { HooksComponent } from './pages/hooks/hooks.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './pages/main/main.component';
import { ParentMainComponent } from './pages/parent-main/parent-main.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AppComponent,
        HoverHighlightDirective,
        BarChartComponent,
        PieChartComponent,
        DataBindingComponent,
        DemoComponent,
        TreeViewComponent, HooksComponent,
        MainComponent, ParentMainComponent
    ],
    imports: [
        BrowserModule, FormsModule, RouterModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
