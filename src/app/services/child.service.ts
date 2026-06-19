import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Child } from '../models/child.model';
import { SAMPLE_CHILDREN } from '../data/sample-data';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  constructor(private http: HttpClient) {}

  getChildren(): Observable<Child[]> {
    // Retorna dados de exemplo para desenvolvimento
    return of(SAMPLE_CHILDREN);
  }

  getChild(id: string): Observable<Child> {
    const found = SAMPLE_CHILDREN.find(c => c.id === id);
    return of(found as Child);
  }

  createChild(child: Child): Observable<Child> {
    // Em ambiente real salvaríamos via API; aqui apenas retornamos o objeto
    return of(child);
  }

  updateChild(id: string, child: Child): Observable<Child> {
    return of(child);
  }

  deleteChild(id: string): Observable<void> {
    return of();
  }
}
