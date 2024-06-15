import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export default class ChatsComponent {

  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  isOpen: boolean = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.dropdownMenu.nativeElement.classList.toggle('hidden', !this.isOpen);
    if (this.isOpen) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 0);
    }
  }

  filterItems(): void {
    const searchTerm = this.searchInput.nativeElement.value.toLowerCase();
    const items = this.dropdownMenu.nativeElement.querySelectorAll('a');

    items.forEach((item: any) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
  }



}
