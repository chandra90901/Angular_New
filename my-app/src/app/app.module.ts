import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HoverHighlightDirective } from './pages/customdirectives/hover-highlight.directive';
import { AuthInterceptor } from './Services/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BarChartComponent } from './pages/bar-chart/bar-chart.component';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
import { TreeViewComponent } from './pages/tree-view/tree-view.component';
import { HooksComponent } from './pages/hooks/hooks.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from './Services/global-error-handler.service';
@NgModule({
    declarations: [
        AppComponent,
        HoverHighlightDirective,
        BarChartComponent,
        PieChartComponent,
        TreeViewComponent,
        HooksComponent
    ],
    imports: [
        BrowserModule, FormsModule, RouterModule, ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }), BrowserAnimationsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, { provide: ErrorHandler, useClass: GlobalErrorHandler }

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
