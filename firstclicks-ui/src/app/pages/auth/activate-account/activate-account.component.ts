import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../../services/services';
import { CodeInputModule } from 'angular-code-input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [RouterModule, CodeInputModule, CommonModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css',
})
export default class ActivateAccountComponent {
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  redireccionLogin() {
    this.router.navigate(['']);
  }

  confirmAccount(token: string) {
    this.authService.confirm({ token }).subscribe({
      next: () => {
        this.message = 'Tu cuenta ha sido activada correctamente.';
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
        this.message = 'Token caducado o invalido';
        this.submitted = true;
        this.isOkay = false;
      },
    });
  }
}
