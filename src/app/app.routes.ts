import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
    title: 'SeekCasino - Ana Sayfa'
  },
  {
    path: 'casinos/:id',
    loadComponent: () => import('./pages/casino-detail/casino-detail.component').then(c => c.CasinoDetailComponent),
    title: 'Casino Detayı'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent),
    title: 'Sayfa Bulunamadı'
  }
];
