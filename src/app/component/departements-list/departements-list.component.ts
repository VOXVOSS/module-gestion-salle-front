import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-departements-list',
  templateUrl: './departements-list.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./departements-list.component.css']
})
export class DepartementsListComponent implements OnInit {
  departements: any[] = [];
  total = 0;
  totalPages = 1;
  page = 1;
  pageSize = 10;
  searchQuery = '';
  sortBy = '';
  sortOrder = 'ASC';
  apiUrl = 'http://localhost:3000/api/departement';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDepartements();
  }

  loadDepartements(): void {
    let params = new HttpParams();
  
    // Add parameters only if they are set
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
  
    // Make the API call
    this.http.get<any>(this.apiUrl, { params }).subscribe({
      next: (response) => {
        this.departements = response.departements;
        this.total = response.total;
        this.totalPages = response.totalPages;
      },
      error: (error) => {
        console.error('Error loading departements:', error);
      },
    });
  }
  
  updatePageSize(event: Event): void {
    const selectedPageSize = +(event.target as HTMLSelectElement).value;
    this.pageSize = selectedPageSize;
    this.page = 1; // Reset to the first page when changing page size
    this.loadDepartements(); // Reload data with the new page size
  }
  

  updateSort(field: string): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = field;
      this.sortOrder = 'ASC';
    }
    this.loadDepartements();
  }

  search(): void {
    this.page = 1; // Reset to first page on search
    this.loadDepartements();
  }

  goToPage(page: number): void {
    this.page = page;
    this.loadDepartements();
  }
}
