import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Cliente, CreateClienteRequest, UpdateClienteRequest } from '../models/cliente.model';
import { ClienteConServicios } from '../models/servicio.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  constructor(private readonly api: ApiService) {}

  getAll(): Observable<Cliente[]> {
    return this.api.get<Cliente[]>('/clientes');
  }

  getByIdentificacion(identificacion: string): Observable<Cliente> {
    return this.api.get<Cliente>(`/clientes/${identificacion}`);
  }

  getConServicios(identificacion: string): Observable<ClienteConServicios> {
    return this.api.get<ClienteConServicios>(`/clientes/${identificacion}/servicios`);
  }

  create(cliente: CreateClienteRequest): Observable<Cliente> {
    return this.api.post<Cliente>('/clientes', cliente);
  }

  update(identificacion: string, cliente: UpdateClienteRequest): Observable<Cliente> {
    return this.api.put<Cliente>(`/clientes/${identificacion}`, cliente);
  }

  delete(identificacion: string): Observable<void> {
    return this.api.delete<void>(`/clientes/${identificacion}`);
  }
}
