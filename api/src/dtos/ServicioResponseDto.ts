import { Servicio } from '../entities/Servicio';

export interface ServicioResponseDto {
  identificacion: string;
  servicio: string;
  fechaInicio: string;
  ultimaFacturacion: string;
  ultimoPago: number;
}

export function toServicioResponseDto(servicio: Servicio): ServicioResponseDto {
  return {
    identificacion: servicio.identificacion,
    servicio: servicio.servicio,
    fechaInicio: servicio.fechaInicio,
    ultimaFacturacion: servicio.ultimaFacturacion,
    ultimoPago: servicio.ultimoPago,
  };
}
