import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameType, Language, Licence, PaymentMethod, Provider } from '../../models/casino.model';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent {
  @Input() licences: Licence[] = [];
  @Input() providers: Provider[] = [];
  @Input() gameTypes: GameType[] = [];
  @Input() languages: Language[] = [];
  @Input() paymentMethods: PaymentMethod[] = [];
  
  @Input() selectedLicenceId?: string;
  @Input() selectedProviderId?: string;
  @Input() selectedGameTypeId?: string;
  @Input() selectedLanguageId?: string;
  @Input() selectedPaymentMethodId?: string;
  
  @Output() licenceChanged = new EventEmitter<string | null>();
  @Output() providerChanged = new EventEmitter<string | null>();
  @Output() gameTypeChanged = new EventEmitter<string | null>();
  @Output() languageChanged = new EventEmitter<string | null>();
  @Output() paymentMethodChanged = new EventEmitter<string | null>();
  
  // Arama filtreleri
  licenceFilter = '';
  providerFilter = '';
  gameTypeFilter = '';
  languageFilter = '';
  paymentMethodFilter = '';
  
  // Filtrelenmiş listeleri döndüren getter metodları
  get filteredLicences(): Licence[] {
    return this.filterItems(this.licences, this.licenceFilter, 'name');
  }
  
  get filteredProviders(): Provider[] {
    return this.filterItems(this.providers, this.providerFilter, 'name');
  }
  
  get filteredGameTypes(): GameType[] {
    return this.filterItems(this.gameTypes, this.gameTypeFilter, 'name');
  }
  
  get filteredLanguages(): Language[] {
    return this.filterItems(this.languages, this.languageFilter, 'name');
  }
  
  get filteredPaymentMethods(): PaymentMethod[] {
    return this.filterItems(this.paymentMethods, this.paymentMethodFilter, 'name');
  }
  
  // Filtre değişikliği metodları
  onLicenceChange(licenceId: string | null): void {
    this.selectedLicenceId = licenceId || undefined;
    this.licenceChanged.emit(licenceId);
  }
  
  onProviderChange(providerId: string | null): void {
    this.selectedProviderId = providerId || undefined;
    this.providerChanged.emit(providerId);
  }
  
  onGameTypeChange(gameTypeId: string | null): void {
    this.selectedGameTypeId = gameTypeId || undefined;
    this.gameTypeChanged.emit(gameTypeId);
  }
  
  onLanguageChange(languageId: string | null): void {
    this.selectedLanguageId = languageId || undefined;
    this.languageChanged.emit(languageId);
  }
  
  onPaymentMethodChange(paymentMethodId: string | null): void {
    this.selectedPaymentMethodId = paymentMethodId || undefined;
    this.paymentMethodChanged.emit(paymentMethodId);
  }
  
  // Yardımcı fonksiyon - metinsel arama filtresi uygular
  private filterItems<T>(items: T[], filterText: string, propertyName: keyof T): T[] {
    if (!filterText.trim()) {
      return items;
    }
    
    const lowerFilter = filterText.toLowerCase();
    return items.filter(item => {
      const value = String(item[propertyName]).toLowerCase();
      return value.includes(lowerFilter);
    });
  }
}
