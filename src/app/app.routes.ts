import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) 
  },
  { 
    path: 'services', 
    loadComponent: () => import('./features/services/services.component').then(m => m.ServicesComponent) 
  },
  { 
    path: 'team', 
    loadComponent: () => import('./features/team/team.component').then(m => m.TeamComponent) 
  },
  { 
    path: 'articles', 
    loadComponent: () => import('./features/articles/articles.component').then(m => m.ArticlesComponent) 
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) 
  }
];
