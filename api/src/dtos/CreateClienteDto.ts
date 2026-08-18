import { TIPOS_IDENTIFICACION_VALORES } from '../constants/catalogos';
import { isNonBlankString, isPastDateString, isValidEmail } from './validators';

export interface CreateClienteDto {
  identificacion: string;
  nombres: string;
  apellidos: string;
  tipoIdentificacion: string;
  fechaNacimiento: string;
  numeroCelular: string;
  correoElectronico: string;
}

export function validateClienteFields(body: Record<string, unknown>): string[] {
  const errors: string[] = [];
  const { nombres, apellidos, tipoIdentificacion, fechaNacimiento, numeroCelular, correoElectronico } = body;

  if (!isNonBlankString(nombres)) {
    errors.push('nombres es obligatorio');
  } else if (nombres.length > 80) {
    errors.push('nombres no puede superar 80 caracteres');
  }

  if (!isNonBlankString(apellidos)) {
    errors.push('apellidos es obligatorio');
  } else if (apellidos.length > 80) {
    errors.push('apellidos no puede superar 80 caracteres');
  }

  if (!isNonBlankString(tipoIdentificacion)) {
    errors.push('tipoIdentificacion es obligatorio');
  } else if (!TIPOS_IDENTIFICACION_VALORES.includes(tipoIdentificacion)) {
    errors.push(`tipoIdentificacion debe ser uno de: ${TIPOS_IDENTIFICACION_VALORES.join(', ')}`);
  }

  if (!isNonBlankString(fechaNacimiento)) {
    errors.push('fechaNacimiento es obligatorio');
  } else if (!isPastDateString(fechaNacimiento)) {
    errors.push('fechaNacimiento debe ser una fecha válida (YYYY-MM-DD) en el pasado');
  }

  if (!isNonBlankString(numeroCelular)) {
    errors.push('numeroCelular es obligatorio');
  } else if (numeroCelular.length > 20) {
    errors.push('numeroCelular no puede superar 20 caracteres');
  }

  if (!isNonBlankString(correoElectronico)) {
    errors.push('correoElectronico es obligatorio');
  } else if (correoElectronico.length > 80) {
    errors.push('correoElectronico no puede superar 80 caracteres');
  } else if (!isValidEmail(correoElectronico)) {
    errors.push('correoElectronico debe tener un formato válido');
  }

  return errors;
}

export function validateCreateClienteDto(body: Record<string, unknown>): string[] {
  const errors: string[] = [];
  const { identificacion } = body;

  if (!isNonBlankString(identificacion)) {
    errors.push('identificacion es obligatorio');
  } else if (identificacion.length > 20) {
    errors.push('identificacion no puede superar 20 caracteres');
  }

  return [...errors, ...validateClienteFields(body)];
}
