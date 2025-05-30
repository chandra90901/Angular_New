import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  title = 'Pie Chart';

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [['Sales'], ['Store'], 'Mail Sales'];
  public pieChartDatasets = [{
    data: [300, 500, 100]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor() { }
}