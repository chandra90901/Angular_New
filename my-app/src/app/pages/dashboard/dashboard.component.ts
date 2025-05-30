import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../Services/demo.service';
import { LoginService } from '../../Services/login.service';
import { Observable, catchError, of } from 'rxjs';
import { Demo } from '../../model/demo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { ToastrService } from 'ngx-toastr';
import { DataTreeComponent } from '../treeData/data-tree.component';
@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule, DataTreeComponent, PieChartComponent, BarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = '';
  isLoggedIn: boolean = false;
  authStatus$: Observable<boolean> = of(false);
  employees: Demo[] = [];
  errorMessage: string = '';
  employeeList: any[] = [];
  constructor(
    private authService: LoginService,
    private employeeService: DemoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // throw new Error('Manual error test');
    this.authStatus$ = this.authService.authStatus$;
    this.checkLoginStatus();
    this.loadEmployees();
  }

  checkLoginStatus(): void {
    const token = this.authService.getToken();
    if (token) {
      this.isLoggedIn = true;
      try {
        const payload: any = JSON.parse(atob(token.split('.')[1]));
        this.username = payload?.username || 'User';
      } catch (err) {
        console.warn('Token decode error:', err);
        this.username = 'User';
      }
    }
  }

  loadEmployees(): void {
    this.employeeService.getAllDemos()
      .pipe(
        catchError(error => {
          this.toastr.error('Error fetching employees:', 'error');
          return ([]);
        })
      )
      .subscribe((data: any) => {
        this.employeeList = data;
      });

  }
}
