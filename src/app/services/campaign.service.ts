import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    // Buscar lista de campanhas
    return new Observable();
  }

  getCampaign(id: string): Observable<Campaign> {
    // Buscar campanha específica
    return new Observable();
  }

  getActiveCampaigns(): Observable<Campaign[]> {
    // Buscar campanhas ativas
    return new Observable();
  }
}
