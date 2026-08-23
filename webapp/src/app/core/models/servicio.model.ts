import { Cliente } from './cliente.model';

export interface Servicio {
  identificacion: string;
  servicio: string;
  fechaInicio: string;
  ultimaFacturacion: string;
  ultimoPago: number;
}

export type CreateServicioRequest = Servicio;

export type UpdateServicioRequest = Omit<Servicio, 'identificacion' | 'servicio'>;

export interface ClienteConServicios {
  cliente: Cliente;
  servicios: Servicio[];
}
