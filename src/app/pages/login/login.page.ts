import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.isLoading = false;
        // Navigate to dashboard
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Falha na autenticação. Verifique suas credenciais.';
        console.error('Erro ao fazer login:', error);
      }
    );
  }

  onGoogleLogin() {
    this.isLoading = true;
    // Implementar login com Google
  }
}
