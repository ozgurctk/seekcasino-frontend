import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Casino, CasinoFilter, GameType, Language, Licence, PaymentMethod, Provider } from '../../models/casino.model';
import { CasinoService } from '../../services/casino.service';
import { CasinoCardComponent } from '../../components/casino-card/casino-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbPaginationModule,
    CasinoCardComponent,
    HeaderComponent,
    FooterComponent,
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
  
  // Filtreleme ve Sayfalama için
  filter: CasinoFilter = {
    pageSize: 12,
    pageNumber: 1
  };
  totalCount = 0;
  pageCount = 0;
  
  // Filtre seçenekleri
  searchTerm = '';
  licences: Licence[] = [];
  providers: Provider[] = [];
  gameTypes: GameType[] = [];
  languages: Language[] = [];
  paymentMethods: PaymentMethod[] = [];
  
  ngOnInit(): void {
    this.loadCasinos();
  }
  
  loadCasinos(): void {
    this.isLoading = true;
    this.error = null;
    
    this.casinoService.getCasinos(this.filter).subscribe({
      next: (response) => {
        this.casinos = response.casinos;
        this.totalCount = response.pagination.totalCount;
        this.pageCount = response.pagination.pageCount;
        
        // Filtreleme seçeneklerini oluştur
        this.collectFilterOptions();
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Casino verileri yüklenirken hata oluştu', err);
        this.error = 'Casino verileri yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.';
        this.isLoading = false;
      }
    });
  }
  
  onPageChange(page: number): void {
    this.filter.pageNumber = page;
    this.loadCasinos();
    // Sayfa değiştiğinde ekranın üstüne dön
    window.scrollTo(0, 0);
  }
  
  onSearch(): void {
    if (this.searchTerm?.trim()) {
      this.filter = {
        ...this.filter,
        pageNumber: 1,
        searchTerm: this.searchTerm.trim(),
        licenceId: undefined,
        providerId: undefined,
        gameTypeId: undefined,
        languageId: undefined,
        paymentMethodId: undefined
      };
    } else {
      this.filter = {
        ...this.filter,
        pageNumber: 1,
        searchTerm: undefined
      };
    }
    
    this.loadCasinos();
  }
  
  onLicenceFilter(licenceId: string | null): void {
    this.resetFilter();
    this.filter.licenceId = licenceId || undefined;
    this.loadCasinos();
  }
  
  onProviderFilter(providerId: string | null): void {
    this.resetFilter();
    this.filter.providerId = providerId || undefined;
    this.loadCasinos();
  }
  
  onGameTypeFilter(gameTypeId: string | null): void {
    this.resetFilter();
    this.filter.gameTypeId = gameTypeId || undefined;
    this.loadCasinos();
  }
  
  onLanguageFilter(languageId: string | null): void {
    this.resetFilter();
    this.filter.languageId = languageId || undefined;
    this.loadCasinos();
  }
  
  onPaymentMethodFilter(paymentMethodId: string | null): void {
    this.resetFilter();
    this.filter.paymentMethodId = paymentMethodId || undefined;
    this.loadCasinos();
  }
  
  resetFilter(): void {
    this.searchTerm = '';
    this.filter = {
      pageSize: this.filter.pageSize,
      pageNumber: 1,
      searchTerm: undefined,
      licenceId: undefined,
      providerId: undefined,
      gameTypeId: undefined,
      languageId: undefined,
      paymentMethodId: undefined
    };
  }
  
  // Filtreleme seçeneklerini (lisans, ödeme yöntemleri vs) güncel casino listesinden topla
  private collectFilterOptions(): void {
    // Bu fonksiyon, gelen casino verileri üzerinden filtre seçeneklerini toplar
    const licencesMap = new Map<string, Licence>();
    const providersMap = new Map<string, Provider>();
    const gameTypesMap = new Map<string, GameType>();
    const languagesMap = new Map<string, Language>();
    const paymentMethodsMap = new Map<string, PaymentMethod>();
    
    this.casinos.forEach(casino => {
      // Lisanslar
      casino.licences.forEach(licence => {
        if (!licencesMap.has(licence.id)) {
          licencesMap.set(licence.id, licence);
        }
      });
      
      // Sağlayıcılar
      casino.providers.forEach(provider => {
        if (!providersMap.has(provider.id)) {
          providersMap.set(provider.id, provider);
        }
      });
      
      // Oyun Türleri
      casino.gameTypes.forEach(gameType => {
        if (!gameTypesMap.has(gameType.id)) {
          gameTypesMap.set(gameType.id, gameType);
        }
      });
      
      // Diller
      casino.languages.forEach(language => {
        if (!languagesMap.has(language.id)) {
          languagesMap.set(language.id, language);
        }
      });
      
      // Ödeme Yöntemleri
      casino.paymentMethods.forEach(paymentMethod => {
        if (!paymentMethodsMap.has(paymentMethod.id)) {
          paymentMethodsMap.set(paymentMethod.id, paymentMethod);
        }
      });
    });
    
    // Map'lerden dizilere çevir
    this.licences = Array.from(licencesMap.values());
    this.providers = Array.from(providersMap.values());
    this.gameTypes = Array.from(gameTypesMap.values());
    this.languages = Array.from(languagesMap.values());
    this.paymentMethods = Array.from(paymentMethodsMap.values());
  }
}
