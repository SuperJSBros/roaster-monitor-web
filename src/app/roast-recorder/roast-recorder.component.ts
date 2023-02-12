import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-roast-recorder',
  templateUrl: './roast-recorder.component.html',
  styleUrls: ['./roast-recorder.component.scss'],
})
export class RoastRecorderComponent {
  // show or hide Batch Metadata input box
  showPanel = true;

  chartAxisXLabel = Array.from({ length: 30 }, (_, i) => i + 1);
  // CONFIG for Line Chart
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.chartAxisXLabel,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 30],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'grey',
        pointBackgroundColor: 'grey',
        pointRadius: 4,
        backgroundColor: 'rgba(200,200,200,0.5)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        align: "center",
        text: 'Roaster Temperature Curves',
      },
    },
  };
  public lineChartLegend = true;
}
