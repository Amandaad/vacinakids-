import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Child } from '../models/child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  constructor(private http: HttpClient) {}

  getChildren(): Observable<Child[]> {
    // Buscar lista de crianças
    return new Observable();
  }

  getChild(id: string): Observable<Child> {
    // Buscar criança específica
    return new Observable();
  }

  createChild(child: Child): Observable<Child> {
    // Criar nova criança
    return new Observable();
  }

  updateChild(id: string, child: Child): Observable<Child> {
    // Atualizar dados da criança
    return new Observable();
  }

  deleteChild(id: string): Observable<void> {
    // Deletar criança
    return new Observable();
  }
}
