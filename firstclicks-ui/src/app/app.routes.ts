import { Title } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { tutorGuard } from './helpers/tutor.guard';
import { studentGuard } from './helpers/student.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/layout/layout.component'),
    children: [
      {
        path: 'login',
        title: 'Inicio de sesión',
        loadComponent: () => import('./pages/auth/login/login.component'),
      },
      {
        path: 'signup',
        title: 'Registro de usuario',
        loadComponent: () => import('./pages/auth/signup/signup.component'),
      },
      {
        path: 'activate-account',
        title: 'Activación Cuenta',
        loadComponent: () =>
          import('./pages/auth/activate-account/activate-account.component'),
      },
    ],
  },
  {
    path: '',
    title: 'FirstCliks',
    loadComponent: () => import('./pages/home/layout/layout.component'),
    children: [
      {
        path: '',
        title: 'Inicio',
        loadComponent: () => import('./pages/home/index/index.component'),
      },
      {
        path: 'courses/:id',
        title: 'detalles del curso',
        loadComponent: () => import('./pages/home/course/course.component'),
      },
      {
        path: 'courses',
        title: 'Explorar',
        loadComponent: () => import('./pages/home/courses/courses.component'),
      },
      {
        path: 'courses/tutor/:tutorId',
        title: 'Cursos del profesor',
        loadComponent: () =>
          import(
            './pages/home/tutor-courses-public/tutor-courses-public.component'
          ),
      },
    ],
  },
  {
    path: 'tutor',
    title: 'Tutor',
    canActivate: [tutorGuard],
    loadComponent: () => import('./pages/home/layout/layout.component'),
    children: [
      {
        path: '',
        title: 'Inicio',
        loadComponent: () => import('./pages/home/index/index.component'),
      },
      {
        path: 'courses',
        title: 'Listado',
        loadComponent: () =>
          import('./pages/tutor/course-list/course-list.component'),
      },
      {
        path: 'profile',
        title: 'perfil',
        loadComponent: () => import('./pages/tutor/profile/profile.component'),
      },
      {
        path: 'admin/new',
        title: 'administrar',
        loadComponent: () =>
          import('./pages/tutor/course-form/course-form.component'),
      },
      {
        path: 'admin/edit/:id',
        title: 'administrar',
        loadComponent: () =>
          import('./pages/tutor/course-form/course-form.component'),
      },
    ],
  },
  {
    path: 'student',
    title: 'Student',
    canActivate: [studentGuard],
    loadComponent: () => import('./pages/home/layout/layout.component'),
    children: [
      {
        path: 'courses',
        title: 'Listado',
        loadComponent: () =>
          import('./pages/student/course-list/course-list.component'),
      },
      {
        path: 'adminEnroll',
        title: 'admin',
        loadComponent: () =>
          import('./pages/student/course-enrolled/course-enrolled.component'),
      },
    ],
  },
];
