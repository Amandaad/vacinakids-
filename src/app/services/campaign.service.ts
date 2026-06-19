import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Campaign } from '../models/campaign';
import { SAMPLE_CAMPAIGNS } from '../data/sample-data';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return of(SAMPLE_CAMPAIGNS);
  }

  getCampaign(id: string): Observable<Campaign> {
    const found = SAMPLE_CAMPAIGNS.find(c => c.id === id);
    return of(found as Campaign);
  }

  getActiveCampaigns(): Observable<Campaign[]> {
    const now = new Date();
    const active = SAMPLE_CAMPAIGNS.filter(c => c.inicio <= now && c.fim >= now);
    return of(active);
  }
}
