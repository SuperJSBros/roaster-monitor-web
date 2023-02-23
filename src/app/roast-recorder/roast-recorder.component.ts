import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { take } from 'rxjs';
import { ProbeDailyService } from '../service/probe-daily.service';

@Component({
  selector: 'app-roast-recorder',
  templateUrl: './roast-recorder.component.html',
  styleUrls: ['./roast-recorder.component.scss'],
})
export class RoastRecorderComponent implements OnInit  {
  public dailyProbeReadings:number[]=[];
  public firstRead:boolean = false
  // public lineChartData?: ChartConfiguration<'line'>['data'];
  constructor(private probeDailyService:ProbeDailyService){}

  public ngOnInit(): void {
    setInterval(() => {
      
      this.probeDailyService.getDailyProbes().pipe(take(1)).subscribe(
        (readings) => {
          if(readings instanceof Array){
            if(this.dailyProbeReadings.length < 600)
              this.dailyProbeReadings.push(...readings.map(reading => reading.probe))
            
            // this.lineChartData = this.createChartConfig(this.dailyProbeReadings);
          }
        }
      );
    }, 1000);
    
  }

  /*private createChartConfig(dataArr:number[]):ChartConfiguration<'line'>['data']{
    return {
      labels: this.chartAxisXLabel,
      datasets: [
        {
          data: dataArr,
          label: 'Series A',
          borderWidth: 2,
          fill: true,
          tension: 0.5,
          borderColor: 'grey',
          pointBackgroundColor: 'grey',
          pointRadius: 0,
          backgroundColor: 'rgba(200,200,200,0.5)',
        },
      ],
    };

  }*/
  // show or hide Batch Metadata input box
  showPanel = true;

  ///////////////////////////
  // CONFIG for Line Chart //
  ///////////////////////////
  chartAxisXLabel = Array.from({ length: 30 }, (_, i) => i + 1);
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.chartAxisXLabel,
    datasets: [
      {
        data: this.dailyProbeReadings,//[65, 59, 80, 81, 56, 55, 40, 30, 50, 60, 66, 80, 88, 100, 200, 250, 300],
        label: 'Series A',
        borderWidth: 2,
        fill: true,
        tension: 0.5,
        borderColor: 'grey',
        pointBackgroundColor: 'grey',
        pointRadius: 0,
        backgroundColor: 'rgba(200,200,200,0.5)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      // tooltip: {
      //   mode: 'nearest',
      //   intersect: true,
      // },
      title: {
        display: false,
        align: "center",
        text: 'Roaster Temperature Curves',
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        display: false,
        min: 0,
        max: 600, //the base chart is for 1 mesureament per 3 sec for 30mins
        ticks: {
          stepSize: 5,
        }
      },
      xInMinutes: {
        type: 'linear',
        position: 'bottom',
        display: true,
        min: 0,
        max: 30,
        ticks: {
          stepSize: 5,
        }
      },
      y:{
        type: 'linear',
        position: 'bottom',
        display: true,
        min: 0,
        max: 450,
        ticks: {
          stepSize: 50,
        }
      }
    }
  };
  public lineChartLegend = true;
  ///////////////////////////////
  // END CONFIG for Line Chart //
  ///////////////////////////////
}
