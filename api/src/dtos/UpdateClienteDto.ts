import { validateClienteFields } from './CreateClienteDto';

export interface UpdateClienteDto {
  nombres: string;
  apellidos: string;
  tipoIdentificacion: string;
  fechaNacimiento: string;
  numeroCelular: string;
  correoElectronico: string;
}

export function validateUpdateClienteDto(body: Record<string, unknown>): string[] {
  return validateClienteFields(body);
}
