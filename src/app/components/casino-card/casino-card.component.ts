import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Casino } from '../../models/casino.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-casino-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './casino-card.component.html',
  styleUrls: ['./casino-card.component.css']
})
export class CasinoCardComponent {
  @Input() casino!: Casino;
  
  // Api URL'sini getirmek için
  apiBaseUrl = environment.apiUrl;
  
  // Yıldız derecelendirmesi için dizi
  get ratingStars(): number[] {
    return Array(Math.floor(this.casino.point / 2)).fill(0);
  }
  
  // Yarım yıldız gerekiyor mu?
  get hasHalfStar(): boolean {
    return this.casino.point % 2 >= 0.5;
  }
  
  // Boş yıldız sayısı
  get emptyStars(): number[] {
    return Array(5 - Math.ceil(this.casino.point / 2)).fill(0);
  }
  
  // İlk 3 ödeme yöntemini göstermek için
  get topPaymentMethods(): any[] {
    return this.casino.paymentMethods.slice(0, 3);
  }
  
  // İlk 3 lisansı göstermek için
  get topLicences(): any[] {
    return this.casino.licences.slice(0, 3);
  }
  
  // Casino logosunun tam URL'sini oluştur
  getLogoUrl(): string {
    if (!this.casino.casinoLogoNameOnDisk) {
      return 'assets/images/placeholder-logo.png';
    }
    
    // Burada API'nın statik dosyalara erişim yolunu bilmeniz gerekiyor
    // Backend'den gelen resim adını kullanarak tam URL oluşturun
    return `${this.apiBaseUrl}/images/casinos/${this.casino.casinoLogoNameOnDisk}`;
  }
}
