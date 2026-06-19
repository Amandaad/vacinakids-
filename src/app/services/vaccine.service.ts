import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaccine } from '../models/vaccine';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  constructor(private http: HttpClient) {}

  getVaccines(): Observable<Vaccine[]> {
    // Buscar lista de vacinas
    return new Observable();
  }

  getVaccine(id: string): Observable<Vaccine> {
    // Buscar vacina específica
    return new Observable();
  }

  getChildVaccines(childId: string): Observable<Vaccine[]> {
    // Buscar vacinas de uma criança
    return new Observable();
  }

  applyVaccine(childId: string, vaccineId: string): Observable<Vaccine> {
    // Registrar aplicação de vacina
    return new Observable();
  }
}
