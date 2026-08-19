import { Cliente } from '../entities/Cliente';
import { ConflictError } from '../exceptions/ConflictError';
import { NotFoundError } from '../exceptions/NotFoundError';
import { ClienteRepository } from '../repositories/cliente.repository';
import { ServicioRepository } from '../repositories/servicio.repository';
import { CreateClienteDto } from '../dtos/CreateClienteDto';
import { UpdateClienteDto } from '../dtos/UpdateClienteDto';

export class ClienteService {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly servicioRepository: ServicioRepository,
  ) {}

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.findAll();
  }

  async findByIdentificacion(identificacion: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findByIdentificacion(identificacion);
    if (!cliente) {
      throw new NotFoundError('El cliente no existe');
    }
    return cliente;
  }

  async create(dto: CreateClienteDto): Promise<Cliente> {
    const existente = await this.clienteRepository.findByIdentificacion(dto.identificacion);
    if (existente) {
      throw new ConflictError('El registro ya existe');
    }
    return this.clienteRepository.create(dto);
  }

  async update(identificacion: string, dto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.clienteRepository.findByIdentificacion(identificacion);
    if (!cliente) {
      throw new NotFoundError('El cliente no existe');
    }
    return this.clienteRepository.update(cliente, dto);
  }

  async delete(identificacion: string): Promise<void> {
    const cliente = await this.clienteRepository.findByIdentificacion(identificacion);
    if (!cliente) {
      throw new NotFoundError('El cliente no existe');
    }

    // La FK usa ON DELETE NO ACTION: se valida antes para responder 409 con un
    // mensaje claro en lugar de dejar que MySQL falle con un error 500.
    const serviciosContratados = await this.servicioRepository.countByIdentificacion(identificacion);
    if (serviciosContratados > 0) {
      throw new ConflictError('El cliente tiene servicios contratados y no puede ser eliminado');
    }

    await this.clienteRepository.delete(cliente.identificacion);
  }
}
