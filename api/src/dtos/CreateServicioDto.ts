import { SERVICIOS_VALORES } from '../constants/catalogos';
import { isNonBlankString, isNonNegativeInteger, isValidDateString } from './validators';

export interface CreateServicioDto {
  identificacion: string;
  servicio: string;
  fechaInicio: string;
  ultimaFacturacion: string;
  ultimoPago: number;
}

export function validateServicioFields(body: Record<string, unknown>): string[] {
  const errors: string[] = [];
  const { fechaInicio, ultimaFacturacion, ultimoPago } = body;

  if (!isNonBlankString(fechaInicio)) {
    errors.push('fechaInicio es obligatorio');
  } else if (!isValidDateString(fechaInicio)) {
    errors.push('fechaInicio debe ser una fecha válida (YYYY-MM-DD)');
  }

  if (!isNonBlankString(ultimaFacturacion)) {
    errors.push('ultimaFacturacion es obligatorio');
  } else if (!isValidDateString(ultimaFacturacion)) {
    errors.push('ultimaFacturacion debe ser una fecha válida (YYYY-MM-DD)');
  }

  if (ultimoPago === undefined || ultimoPago === null || ultimoPago === ('' as unknown)) {
    errors.push('ultimoPago es obligatorio');
  } else if (!isNonNegativeInteger(ultimoPago)) {
    errors.push('ultimoPago debe ser un entero mayor o igual a 0');
  }

  return errors;
}

export function validateCreateServicioDto(body: Record<string, unknown>): string[] {
  const errors: string[] = [];
  const { identificacion, servicio } = body;

  if (!isNonBlankString(identificacion)) {
    errors.push('identificacion es obligatorio');
  } else if (identificacion.length > 20) {
    errors.push('identificacion no puede superar 20 caracteres');
  }

  if (!isNonBlankString(servicio)) {
    errors.push('servicio es obligatorio');
  } else if (!SERVICIOS_VALORES.includes(servicio)) {
    errors.push(`servicio debe ser uno de: ${SERVICIOS_VALORES.join(', ')}`);
  }

  return [...errors, ...validateServicioFields(body)];
}
