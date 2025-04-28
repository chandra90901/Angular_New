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

@NgModule({
    declarations: [
        AppComponent,
        HoverHighlightDirective,
        BarChartComponent,  // Add BarChartComponent to declarations
        PieChartComponent,  // Add PieChartComponent if using it
        DataBindingComponent,
        DemoComponent,
        TreeViewComponent, HooksComponent
    ],
    imports: [
        BrowserModule, FormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
