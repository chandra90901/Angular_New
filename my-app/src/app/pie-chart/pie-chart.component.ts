import { Component } from '@angular/core';
// import { NgChartsModule } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  pieChartData = [300, 500, 100];
  pieChartType: ChartType = 'pie';
}
