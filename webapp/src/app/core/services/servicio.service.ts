import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { CreateServicioRequest, Servicio } from '../models/servicio.model';

@Injectable({ providedIn: 'root' })
export class ServicioService {
  constructor(private readonly api: ApiService) {}

  getAll(): Observable<Servicio[]> {
    return this.api.get<Servicio[]>('/servicios');
  }

  create(servicio: CreateServicioRequest): Observable<Servicio> {
    return this.api.post<Servicio>('/servicios', servicio);
  }
}
