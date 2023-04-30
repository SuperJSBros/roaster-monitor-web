import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { take } from 'rxjs';
import { IBatch, IProbeReading } from 'src/types/interfaces';
import { ProbeDailyService } from '../service/probe-daily.service';
import { LabelFormatter } from '../utils/label-formatter';

@Component({
  selector: 'app-roast-recorder',
  templateUrl: './roast-recorder.component.html',
  styleUrls: ['./roast-recorder.component.scss'],
})
export class RoastRecorderComponent implements OnInit  {
  public lineChartLegend = true; 
  public isRecording = false;
  public batches:IBatch[]= [];
  public selectedBatchLabel:string="";
  private selectedBatch?:IBatch;
  private readonly MAX_READINGS = 600;
  private dailyProbeReadings:IProbeReading[]=Array.from({ length: this.MAX_READINGS }, (_, i) => ({id: "", probe: -1, createdAt: ""}));
  private LabelFormatter = LabelFormatter;

  @ViewChild(BaseChartDirective) private chart?: BaseChartDirective;
  
  constructor(private probeDailyService:ProbeDailyService){}

  public ngOnInit(): void {

    // Fetch batches
    this.probeDailyService.getBatches().pipe(take(1)).subscribe((items)=>
    {
      this.batches = items
    })

    // Fetch daily probes
    this.probeDailyService.getDailyProbes().pipe(take(1)).subscribe(
      (readings)=> {
        this.insertNewReadings(readings);
      }
    );
    setInterval(() => {
      this.probeDailyService.getDailyProbes(10).pipe(take(1)).subscribe(
        (readings) => {
          this.insertNewReadings(readings);
        }
      );
    }, 3000);
  }

  public addBatch(batch:IBatch){
    this.batches.push(batch);
  }

  public startRecording() {
    if(this.selectedBatch)
      this.isRecording = true;
  }

  public stopRecording() {
    this.isRecording = false;
  }

  public setSelectedBatch(batch:IBatch){
    this.selectedBatch = batch;
    this.selectedBatchLabel = LabelFormatter.formatBatchLabel(batch);
  }

  public compareSelectedBatch() {
    if(this.selectedBatch)
    {
    // Fetch batches
    const batchProbes:number[]=Array.from({ length: this.MAX_READINGS }, (_, i) => (-1));
    this.probeDailyService.getBatchProbes().pipe(take(1)).subscribe((items)=>
    {
      items.forEach((savedReading)=>{
        batchProbes.shift();
        batchProbes.push(savedReading.probe);

      })
      this.lineChartData.datasets.push(
        {
          data: batchProbes,
          label: 'Series B',
          borderWidth: 2,
          fill: true,
          tension: 0.5,
          borderColor: 'blue',
          pointBackgroundColor: 'blue',
          pointRadius: 0,
          backgroundColor: 'rgba(200,200,200,0.0)',
        }
      )
      this.chart?.update();
    })
    }
  }

  ///////////////////////////
  // CONFIG for Line Chart //
  ///////////////////////////
  chartAxisXLabel = Array.from({ length: this.MAX_READINGS }, (_, i) => i + 1);

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.chartAxisXLabel,
    datasets: [
      {
        data: this.dailyProbeReadings.map(reading=>reading.probe),
        label: 'Series A',
        borderWidth: 2,
        fill: true,
        tension: 0.5,
        borderColor: 'grey',
        pointBackgroundColor: 'grey',
        pointRadius: 0,
        backgroundColor: 'rgba(200,200,200,0.0)',
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
        max: this.MAX_READINGS, //the base chart is for 1 mesureament per 3 sec for 30mins
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
  ///////////////////////////////
  // END CONFIG for Line Chart //
  ///////////////////////////////

  private insertNewReadings(readings:IProbeReading[]) {
    const newReadings = [...readings.filter(newReading => this.isWithinLast30Minutes(newReading.createdAt))]
      .slice(0, this.MAX_READINGS).reverse(); // Reverse readings because they are in DESC order
    newReadings.forEach((newReading) => {
      const shouldAdd = !this.dailyProbeReadings.map(probe => probe.createdAt).find(date => date === newReading.createdAt); // Ensure the reading has not yet been inserted
      if (shouldAdd) {
        this.dailyProbeReadings.shift();
        this.dailyProbeReadings.push(newReading);

        // When recording, save values to database
        if(this.isRecording && this.selectedBatch && this.selectedBatch.id) {
          this.probeDailyService.saveBatchProbe(newReading.probe, Number(this.selectedBatch.id)).pipe(take(1)).subscribe();
        }

      }
    });
    this.lineChartData.datasets[0].data = this.dailyProbeReadings.map(reading => reading.probe);
    this.chart?.update();
  }

  private isWithinLast30Minutes(timestampStr: string): boolean {
    const timestamp = Date.parse(timestampStr);
    if (isNaN(timestamp)) {
      throw new Error('Invalid timestamp string'); 
    }
    const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000); // Calculate the timestamp 30 minutes ago
    return timestamp >= thirtyMinutesAgo && timestamp <= Date.now(); // Check if the parsed timestamp is between 30 minutes ago and now
  }
}
