import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    // Implementar lógica de autenticação
    return new Observable();
  }

  logout(): void {
    // Implementar lógica de logout
  }

  isAuthenticated(): boolean {
    // Verificar se usuário está autenticado
    return false;
  }
}
