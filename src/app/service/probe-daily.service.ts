import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBatch, IBatchProbeReading, IDailyProbeReading } from 'src/types/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProbeDailyService {
  constructor(private http: HttpClient) {}

  public getDailyProbes(limit: number=0): Observable<IDailyProbeReading[]> {
    const dailyProbeRoute: string =
      environment.api.basePath + environment.api.dailyProbes;
    return this.http.get<IDailyProbeReading[]>(dailyProbeRoute, {
      params: { limit },
    });
  }

  public getBatchProbes(limit: number=0): Observable<IDailyProbeReading[]> {
    const dailyProbeRoute: string =
      environment.api.basePath + environment.api.dailyProbes;
    return this.http.get<IDailyProbeReading[]>(dailyProbeRoute, {
      params: { limit },
    });
  }

  public saveBatchProbe( probe:number,batchId:number ): Observable<IBatchProbeReading[]> {
    const dailyProbeRoute: string =
      environment.api.basePath + environment.api.batchProbes;
    return this.http.post<IBatchProbeReading[]>(dailyProbeRoute,{ 
        probe,
        batchId
       });
  }
  public getBatches(limit: number=0): Observable<IBatch[]> {
    const dailyProbeRoute: string =
      environment.api.basePath + environment.api.batches;
    return this.http.get<IBatch[]>(dailyProbeRoute, {
      params: { limit },
    });
  }

  public saveBatch(partialBatch:Partial<IBatch>): Observable<IBatch> {
    const dailyProbeRoute: string =
      environment.api.basePath + environment.api.batches;
    return this.http.post<IBatch>(dailyProbeRoute, partialBatch);
  }
}
