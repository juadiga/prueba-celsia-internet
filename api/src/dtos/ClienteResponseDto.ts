import { Cliente } from '../entities/Cliente';

export interface ClienteResponseDto {
  identificacion: string;
  nombres: string;
  apellidos: string;
  tipoIdentificacion: string;
  fechaNacimiento: string;
  numeroCelular: string;
  correoElectronico: string;
}

export function toClienteResponseDto(cliente: Cliente): ClienteResponseDto {
  return {
    identificacion: cliente.identificacion,
    nombres: cliente.nombres,
    apellidos: cliente.apellidos,
    tipoIdentificacion: cliente.tipoIdentificacion,
    fechaNacimiento: cliente.fechaNacimiento,
    numeroCelular: cliente.numeroCelular,
    correoElectronico: cliente.correoElectronico,
  };
}
