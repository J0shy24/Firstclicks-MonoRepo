import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AuthenticationRequestDto } from '../../../../services/models';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export default class IndexComponent {
  courses = './courses';
  course = './course';
  isClosed = false;

  click() {
    this.isClosed = true;
  }

  singup = '/auth/signup';

  private authService = inject(AuthService);
  private router = inject(Router);

  authRequest: AuthenticationRequestDto = {
    userName: '',
    password: '',
  };

  errors: string[] = [];

  login(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.authService.login(this.authRequest).subscribe({
      next: (profile) => {
        this.click();
        this.router.navigate(['']);
      },
      error: (error) => {
        if (error.error.errorCode) {
          this.errors.push('Error en el email o contraseña');
        }
      },
    });
  }
}
