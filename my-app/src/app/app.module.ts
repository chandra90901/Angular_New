import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HoverHighlightDirective } from './hover-highlight.directive';
// import { BarChartComponent } from './bar-chart/bar-chart.component';
// import { PieChartComponent } from './pie-chart/pie-chart.component';
// import { BaseChartDirective } from 'ng2-charts';
@NgModule({
    declarations: [
        AppComponent,
        HoverHighlightDirective,
        // BarChartComponent,
        // PieChartComponent
    ],
    imports: [
        BrowserModule,
        // NgChartsModule  // Add NgChartsModule to imports
        // BaseChartDirective
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
