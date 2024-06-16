import {
  Component,
  ElementRef,
  ViewChild,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AuthenticationRequestDto } from '../../../../services/models';
import { FormsModule, NgForm } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule, FormsModule, FooterComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export default class IndexComponent {
  @ViewChild('userNameInput') userNameInput: ElementRef | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;
  courses = './courses';
  course = './course';
  isClosed = false;
  constructor(private elementRef: ElementRef) {}

  // Comprueba si el modal está abierto, en ese caso hace un focus en el primer elemento input
  onModalTransitionEnd() {
    if (!this.isClosed && this.userNameInput) {
      this.userNameInput.nativeElement.focus();
    }
  }
  // Hace focus al input de la contraseña (por defecto al submit)
  focusPassword() {
    const passwordInput: HTMLInputElement =
      this.elementRef.nativeElement.querySelector('input[type=password]');
    if (passwordInput) {
      passwordInput.focus();
    }
  }

  click() {
    this.isClosed = true;
  }

  singup = '/auth/signup';

  private authService = inject(AuthService);
  private router = inject(Router);
  private courseService = inject(CourseService);

  authRequest: AuthenticationRequestDto = {
    userName: '',
    password: '',
  };

  errors: string[] = [];

  login(form: NgForm) {
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
          this.errors.push('El usuario o la contraseña son incorrectos.');
        }
      },
    });
  }

  searchTech(tech: string) {
    this.courseService.setTech(tech);
    this.router.navigate(['./courses']);
  }
}
