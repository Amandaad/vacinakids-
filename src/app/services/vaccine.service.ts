import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Vaccine } from '../models/vaccine.model';
import { SAMPLE_VACCINES, getVaccinesForChild } from '../data/sample-data';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  constructor(private http: HttpClient) {}

  getVaccines(): Observable<Vaccine[]> {
    return of(SAMPLE_VACCINES);
  }

  getVaccine(id: string): Observable<Vaccine> {
    const found = SAMPLE_VACCINES.find(v => v.id === id);
    return of(found as Vaccine);
  }

  getChildVaccines(childId: string): Observable<Vaccine[]> {
    const list = getVaccinesForChild(childId);
    return of(list);
  }

  applyVaccine(childId: string, vaccineId: string): Observable<Vaccine> {
    const vaccine = SAMPLE_VACCINES.find(v => v.id === vaccineId) as Vaccine;
    if (vaccine) {
      vaccine.appliedDate = new Date().toISOString().split('T')[0];
      vaccine.status = 'aplicada';
    }
    return of(vaccine);
  }
}
