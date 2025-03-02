import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CasinoService } from '../../services/casino.service';
import { Casino, CasinoFilter, CasinoListResponse, GameType, Language, Licence, PaymentMethod, Provider } from '../../models/casino.model';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CasinoCardComponent } from '../../shared/casino-card/casino-card.component';
import { FilterSidebarComponent } from '../../shared/filter-sidebar/filter-sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbPaginationModule,
    HeaderComponent,
    FooterComponent,
    CasinoCardComponent,
    FilterSidebarComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private casinoService = inject(CasinoService);
  
  casinos: Casino[] = [];
  isLoading = true;
  error: string | null = null;
  
  // Filtre seçenekleri
  filter: CasinoFilter = {
    pageSize: 9,
    pageNumber: 1
  };
  
  // Sayfalama bilgileri
  totalItems = 0;
  currentPage = 1;
  pageSize = 9;
  
  ngOnInit(): void {
    this.loadCasinos();
  }
  
  loadCasinos(): void {
    this.isLoading = true;
    this.error = null;
    
    this.casinoService.getCasinos(this.filter).subscribe({
      next: (response: CasinoListResponse) => {
        this.casinos = response.casinos;
        this.totalItems = response.pagination.totalCount;
        this.currentPage = response.pagination.currentPage;
        this.pageSize = response.pagination.pageSize;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Casino verilerini getirirken hata oluştu:', err);
        this.error = 'Casino verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        this.isLoading = false;
      }
    });
  }
  
  onPageChange(page: number): void {
    this.filter.pageNumber = page;
    this.loadCasinos();
    // Sayfa değiştiğinde sayfanın en üstüne git
    window.scrollTo(0, 0);
  }
  
  onFilterChange(newFilter: CasinoFilter): void {
    // Yeni sayfaya geçtiğimizde sayfa numarasını 1'e sıfırla
    this.filter = { ...newFilter, pageNumber: 1 };
    this.loadCasinos();
  }
  
  onSearchChange(searchTerm: string): void {
    this.filter = { 
      ...this.filter, 
      searchTerm: searchTerm || undefined,
      pageNumber: 1
    };
    this.loadCasinos();
  }
}
