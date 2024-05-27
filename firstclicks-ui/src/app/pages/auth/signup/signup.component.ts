import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../../services/services';
import { RequestUserClientDto } from '../../../../services/models';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export default class SignupComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private accountService = inject(AuthenticationService);

  form = this.fb.group({
    userName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    dateOfBirth: ['', [Validators.required]],
    roleId: [0, [Validators.required]],
    address: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    photoRoute: [''],
    description: [''],
  });

  errors: string[] = [];

  signup() {
    console.log(this.form);
    if (this.form.invalid) {
      if (this.form.get('role')?.status == 'INVALID') {
        this.errors.push('No ha selecionado tipo de usuario TUTOR | ALUMNO');
      }
      return;
    }
    const formValue = this.form.value;
    this.accountService.register({ body: this.form!.value }).subscribe({
      next: (profile) => {
        this.router.navigate(['/auth/activate-account']);
      },
      error: (error) => {
        console.log(error);
        if (error.error.status === 400) {
          if (error.error.error) {
            this.errors = error.error.error;
          } else {
            this.errors = [error.error.detail];
          }
        }
      },
    });
  }
}
