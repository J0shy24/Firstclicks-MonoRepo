import { Component, inject, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../../services/services';
import { CodeInputModule } from 'angular-code-input';
import { CommonModule } from '@angular/common';
import tippy from 'tippy.js'; // Importamos Tippy.js
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/themes/material.css';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [RouterModule, CodeInputModule, CommonModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css',
})
export default class ActivateAccountComponent implements AfterViewInit { // Implementamos AfterViewInit

  private authService = inject(AuthenticationService);
  private router = inject(Router);

  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor() {}



  ngAfterViewInit(): void {
  

    tippy('#myButton', {
      animation: 'shift-away',
      content: "Se ha enviado el código de activación a su correo electrónico.",
      theme:'material',
    });
  
  
  }
  
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
        this.message = 'Token caducado o inválido';
        this.submitted = true;
        this.isOkay = false;
      },
    });
  }
}
