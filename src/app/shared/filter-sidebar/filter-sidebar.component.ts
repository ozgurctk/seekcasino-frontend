import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CasinoFilter, GameType, Language, Licence, PaymentMethod, Provider } from '../../models/casino.model';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent implements OnInit {
  @Output() filterChange = new EventEmitter<CasinoFilter>();
  
  // Filtre seçenekleri (API'den gelecek)
  licences: Licence[] = [
    { id: '1abc729a-b8e9-4835-aea3-353969ea46b0', name: 'Malta Gaming Authority', imageNameOnDisc: 'malta.png' },
    { id: '2abc729a-b8e9-4835-aea3-353969ea46b0', name: 'Curacao eGaming', imageNameOnDisc: 'curacao.png' },
    { id: '3abc729a-b8e9-4835-aea3-353969ea46b0', name: 'UK Gambling Commission', imageNameOnDisc: 'uk.png' }
  ];
  
  providers: Provider[] = [
    { id: '1def729a-b8e9-4835-aea3-353969ea46b0', name: 'NetEnt', imageNameOnDisc: 'netent.png' },
    { id: '2def729a-b8e9-4835-aea3-353969ea46b0', name: 'Microgaming', imageNameOnDisc: 'microgaming.png' },
    { id: '3def729a-b8e9-4835-aea3-353969ea46b0', name: 'Playtech', imageNameOnDisc: 'playtech.png' }
  ];
  
  gameTypes: GameType[] = [
    { id: '1ghi729a-b8e9-4835-aea3-353969ea46b0', name: 'Slot Oyunları', imageNameOnDisc: 'slots.png' },
    { id: '2ghi729a-b8e9-4835-aea3-353969ea46b0', name: 'Masa Oyunları', imageNameOnDisc: 'table.png' },
    { id: '3ghi729a-b8e9-4835-aea3-353969ea46b0', name: 'Canlı Casino', imageNameOnDisc: 'live.png' }
  ];
  
  languages: Language[] = [
    { id: '1jkl729a-b8e9-4835-aea3-353969ea46b0', name: 'Türkçe', imageNameOnDisc: 'tr.png' },
    { id: '2jkl729a-b8e9-4835-aea3-353969ea46b0', name: 'İngilizce', imageNameOnDisc: 'en.png' },
    { id: '3jkl729a-b8e9-4835-aea3-353969ea46b0', name: 'Almanca', imageNameOnDisc: 'de.png' }
  ];
  
  paymentMethods: PaymentMethod[] = [
    { id: '1mno729a-b8e9-4835-aea3-353969ea46b0', name: 'Visa', imageNameOnDisc: 'visa.png' },
    { id: '2mno729a-b8e9-4835-aea3-353969ea46b0', name: 'MasterCard', imageNameOnDisc: 'mastercard.png' },
    { id: '3mno729a-b8e9-4835-aea3-353969ea46b0', name: 'PayPal', imageNameOnDisc: 'paypal.png' }
  ];
  
  // Seçili filtreler
  selectedLicence: string | null = null;
  selectedProvider: string | null = null;
  selectedGameType: string | null = null;
  selectedLanguage: string | null = null;
  selectedPaymentMethod: string | null = null;
  
  ngOnInit(): void {
    // Başlangıçta filtre olmadığını bildir
    this.emitFilters();
  }
  
  // Filtre değişikliğinde event yayınla
  onFilterChange(): void {
    this.emitFilters();
  }
  
  // Filtreleri temizle
  clearFilters(): void {
    this.selectedLicence = null;
    this.selectedProvider = null;
    this.selectedGameType = null;
    this.selectedLanguage = null;
    this.selectedPaymentMethod = null;
    this.emitFilters();
  }
  
  // Filtre kriterlerini oluştur ve yayınla
  private emitFilters(): void {
    const filter: CasinoFilter = {
      licenceId: this.selectedLicence || undefined,
      providerId: this.selectedProvider || undefined,
      gameTypeId: this.selectedGameType || undefined,
      languageId: this.selectedLanguage || undefined,
      paymentMethodId: this.selectedPaymentMethod || undefined
    };
    
    this.filterChange.emit(filter);
  }
}
