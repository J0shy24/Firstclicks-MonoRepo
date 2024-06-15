import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export default class LayoutComponent {
  login = '/auth/login';
  courses = '/courses';
  course = './course';
  signup = './auth/signup';
  chats = './chats';

  private authService = inject(AuthService);
  private router = inject(Router);

  get user() {
    return this.authService.auth()?.user;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
