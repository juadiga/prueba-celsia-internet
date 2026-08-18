import { validateServicioFields } from './CreateServicioDto';

export interface UpdateServicioDto {
  fechaInicio: string;
  ultimaFacturacion: string;
  ultimoPago: number;
}

export function validateUpdateServicioDto(body: Record<string, unknown>): string[] {
  return validateServicioFields(body);
}
