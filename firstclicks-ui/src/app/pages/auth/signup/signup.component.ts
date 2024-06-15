import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
  telfClosed = false;
  errors: string[] = [];

  @ViewChild('firstInput', { static: true }) firstInput!: ElementRef;

  // Nada más iniciar se pone el focus en el primer input
  ngAfterViewInit() {
    if (this.firstInput) {
      this.firstInput.nativeElement.focus();
    }
  }

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
    phoneNumber: [null],
  });

  formFieldsOrder = [
    'firstName',
    'lastName',
    'userName',
    'address',
    'email',
    'password',
    'dateOfBirth',
    'roleId',
    'gender',
  ];

  // Hace FOCUS de input a input
  goToNextInput(event: KeyboardEvent | string, currentInputName: string) {
    if (typeof event === 'string') {
      currentInputName = event;
    } else {
      if (event instanceof KeyboardEvent && event.key !== 'Enter') {
        return;
      }
      if (event instanceof Event && event.type === 'change') {
        const nextIndex = this.formFieldsOrder.indexOf(currentInputName) + 1;
        const nextInputName = this.formFieldsOrder[nextIndex];
        const nextInput = document.querySelector(
          `[formControlName="${nextInputName}"]`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
        return;
      }
      event.preventDefault();
    }

    const currentIndex = this.formFieldsOrder.indexOf(currentInputName);

    const nextIndex = currentIndex + 1;

    if (nextIndex < this.formFieldsOrder.length) {
      const nextInputName = this.formFieldsOrder[nextIndex];

      const nextInput = document.querySelector(
        `[formControlName="${nextInputName}"]`
      ) as HTMLInputElement;

      if (nextInput) {
        if (nextInput.type === 'radio' && nextInput.value === '2') {
          const phoneNumberInput = document.querySelector(
            '[formControlName="phoneNumber"]'
          ) as HTMLInputElement;
          if (phoneNumberInput) {
            phoneNumberInput.focus();
          }
        } else {
          nextInput.focus();
        }
      }
    }
  }
  //Maneja cuando se hace click en tutor
  handleTutorClick() {
    const phoneNumberInput = document.querySelector(
      '[formControlName="phoneNumber"]'
    ) as HTMLInputElement;
    if (phoneNumberInput) {
      phoneNumberInput.focus();
    }
  }

  //Maneja cuando se hace click en el estudiante
  handleStudentClick() {
    const genderSelect = document.getElementById('gender') as HTMLSelectElement;
    if (genderSelect) {
      genderSelect.focus();
    }
  }

  //Maneja el focus del select
  goToSelect(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const selectInput = document.querySelector(
        '#gender'
      ) as HTMLSelectElement;
      if (selectInput) {
        selectInput.focus();
      }
    }
  }

  signup() {
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

  mostrarInputTel(cambiar: boolean) {
    this.telfClosed = cambiar;

    if (cambiar) {
      this.form.controls['phoneNumber'].setValidators([
        Validators.required,
        Validators.pattern('[0-9]{9}'),
      ]);
    } else {
      this.form.controls['phoneNumber'].clearValidators();
    }
    this.form.controls['phoneNumber'].updateValueAndValidity();
  }
}
