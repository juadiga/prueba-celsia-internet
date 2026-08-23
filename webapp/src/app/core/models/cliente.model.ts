export interface Cliente {
  identificacion: string;
  nombres: string;
  apellidos: string;
  tipoIdentificacion: string;
  fechaNacimiento: string;
  numeroCelular: string;
  correoElectronico: string;
}

export type CreateClienteRequest = Cliente;

export type UpdateClienteRequest = Omit<Cliente, 'identificacion'>;
