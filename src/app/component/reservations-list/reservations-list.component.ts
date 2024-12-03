import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent implements OnInit {
  reservations: any[] = [];
  total = 0;
  totalPages = 1;
  page = 1;
  pageSize = 10;
  searchQuery = '';
  sortBy = '';
  sortOrder = 'ASC';
  apiUrl = 'http://localhost:3000/api/departement/reservation';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    let params = new HttpParams();
  
    if (this.page) {
      params = params.set('page', this.page);
    }
    if (this.pageSize) {
      params = params.set('pageSize', this.pageSize);
    }
    if (this.searchQuery) {
      params = params.set('search', this.searchQuery);
    }
    if (this.sortBy) {
      params = params.set('sortBy', this.sortBy);
    }
    if (this.sortOrder) {
      params = params.set('sortOrder', this.sortOrder);
    }
  
    this.http.get<any>(this.apiUrl, { params }).subscribe({
      next: (response) => {
        this.reservations = response.reservations;
        this.total = response.total;
        this.totalPages = response.totalPages;
      },
      error: (error) => {
        console.error('Error loading reservations:', error);
      },
    });
  }

  updatePageSize(event: Event): void {
    const selectedPageSize = +(event.target as HTMLSelectElement).value;
    this.pageSize = selectedPageSize;
    this.page = 1;
    this.loadReservations();
  }

  updateSort(field: string): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = field;
      this.sortOrder = 'ASC';
    }
    this.loadReservations();
  }

  search(): void {
    this.page = 1;
    this.loadReservations();
  }

  goToPage(page: number): void {
    this.page = page;
    this.loadReservations();
  }
}
