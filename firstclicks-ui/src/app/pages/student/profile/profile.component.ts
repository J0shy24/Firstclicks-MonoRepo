import { Component, OnInit, inject } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { StudentPrivateProfileDto } from '../../../../services/models';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { ApiImgPipe } from '../../../shared/api-img.pipe';
import { RouterModule } from '@angular/router';

interface Course {
  id: string;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CarouselModule, CommonModule, ApiImgPipe, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export default class ProfileComponent implements OnInit {
  private studentProfileService = inject(ProfileService);
  studentProfile: StudentPrivateProfileDto = {};
  courses: Course[] = [];
  responsiveOptions: any[] = [];

  ngOnInit(): void {
    this.courses = [
      {
        id: '1',
        name: 'Curso de lógica e programación',
        description: 'Lorem imoiwe wefwe werwer werwer werwer wer',
        image: 'course1.jpg',
      },
      {
        id: '2',
        name: 'Curso de HTML',
        description: 'Lorem imoiwe wefwe werwer werwer werwer wer',
        image: 'course2.jpg',
      },
      {
        id: '3',
        name: 'Curso de CSS',
        description: 'Lorem imoiwe wefwe werwer werwer werwer wer',
        image: 'course3.jpg',
      },
      {
        id: '4',
        name: 'Curso de Cobol',
        description: 'Lorem imoiwe wefwe werwer werwer werwer wer',
        image: 'course3.jpg',
      },
      // Añade más cursos según sea necesario
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.studentProfileService.getProfileStudent().subscribe((student) => {
      this.studentProfile = student;
    });
  }

  colorEnabled(isActive: boolean | undefined) {
    if (isActive == undefined) {
      return ' text-black hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm';
    }
    if (isActive) {
      return 'bg-info text-black hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm';
    } else {
      return 'bg-error text-black hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm';
    }
  }
}
