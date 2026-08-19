import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { TipoIdentificacion } from '../models/catalogo.model';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  constructor(private readonly api: ApiService) {}

  getTiposIdentificacion(): Observable<TipoIdentificacion[]> {
    return this.api.get<TipoIdentificacion[]>('/catalogos/tipos-identificacion');
  }

  getServicios(): Observable<string[]> {
    return this.api.get<string[]>('/catalogos/servicios');
  }
}
