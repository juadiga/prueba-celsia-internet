import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clientes' },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./features/clientes/clientes-list/clientes-list.component').then((m) => m.ClientesListComponent),
  },
  {
    path: 'clientes/nuevo',
    loadComponent: () =>
      import('./features/clientes/cliente-form/cliente-form.component').then((m) => m.ClienteFormComponent),
  },
  {
    path: 'clientes/:identificacion/editar',
    loadComponent: () =>
      import('./features/clientes/cliente-form/cliente-form.component').then((m) => m.ClienteFormComponent),
  },
];
