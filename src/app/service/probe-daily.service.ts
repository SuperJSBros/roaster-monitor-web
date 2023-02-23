import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDailyProbeReading } from 'src/types/interfaces';
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
}
