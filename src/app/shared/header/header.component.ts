import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();
  searchTerm: string = '';
  
  onSearch(): void {
    this.search.emit(this.searchTerm);
  }
  
  clearSearch(): void {
    this.searchTerm = '';
    this.search.emit('');
  }
}
