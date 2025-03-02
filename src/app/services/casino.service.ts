import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Casino, CasinoFilter, CasinoListResponse } from '../models/casino.model';

@Injectable({
  providedIn: 'root'
})
export class CasinoService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/casinos`;

  /**
   * Casinoları filtreleme opsiyonları ile getirir
   */
  getCasinos(filter: CasinoFilter = {}): Observable<CasinoListResponse> {
    let params = new HttpParams();
    
    // Filtre parametrelerini ekle
    if (filter.pageNumber) {
      params = params.append('pageNumber', filter.pageNumber.toString());
    }
    
    if (filter.pageSize) {
      params = params.append('pageSize', filter.pageSize.toString());
    }
    
    if (filter.searchTerm) {
      params = params.append('searchTerm', filter.searchTerm);
    }
    
    if (filter.licenceId) {
      params = params.append('licenceId', filter.licenceId);
    }
    
    if (filter.providerId) {
      params = params.append('providerId', filter.providerId);
    }
    
    if (filter.gameTypeId) {
      params = params.append('gameTypeId', filter.gameTypeId);
    }
    
    if (filter.languageId) {
      params = params.append('languageId', filter.languageId);
    }
    
    if (filter.paymentMethodId) {
      params = params.append('paymentMethodId', filter.paymentMethodId);
    }

    return this.http.get<CasinoListResponse>(this.baseUrl, { params });
  }

  /**
   * Belirli bir casino detayını getirir
   */
  getCasinoById(id: string): Observable<Casino> {
    return this.http.get<Casino>(`${this.baseUrl}/${id}`);
  }
}
