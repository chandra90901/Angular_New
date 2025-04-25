import { Component } from '@angular/core';
// import { NgChartsStandaloneModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  barChartLabels: string[] = ['2020', '2021', '2022'];

  barChartData = [
    { data: [65, 59, 80], label: 'Sales' },
    { data: [28, 48, 40], label: 'Revenue' }
  ];

  barChartType: ChartType = 'bar';
}
