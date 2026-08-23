import { Servicio } from '../entities/Servicio';
import { ConflictError } from '../exceptions/ConflictError';
import { NotFoundError } from '../exceptions/NotFoundError';
import { ClienteRepository } from '../repositories/cliente.repository';
import { ServicioRepository } from '../repositories/servicio.repository';
import { CreateServicioDto } from '../dtos/CreateServicioDto';
import { UpdateServicioDto } from '../dtos/UpdateServicioDto';

export class ServicioService {
  constructor(
    private readonly servicioRepository: ServicioRepository,
    private readonly clienteRepository: ClienteRepository,
  ) {}

  findAll(): Promise<Servicio[]> {
    return this.servicioRepository.findAll();
  }

  async create(dto: CreateServicioDto): Promise<Servicio> {
    const cliente = await this.clienteRepository.findByIdentificacion(dto.identificacion);
    if (!cliente) {
      throw new NotFoundError('El cliente no existe');
    }

    const existente = await this.servicioRepository.findOne(dto.identificacion, dto.servicio);
    if (existente) {
      throw new ConflictError('El registro ya existe');
    }

    return this.servicioRepository.create(dto);
  }

  async update(identificacion: string, servicio: string, dto: UpdateServicioDto): Promise<Servicio> {
    const existente = await this.servicioRepository.findOne(identificacion, servicio);
    if (!existente) {
      throw new NotFoundError('El servicio no existe');
    }
    return this.servicioRepository.update(existente, dto);
  }

  async delete(identificacion: string, servicio: string): Promise<void> {
    const existente = await this.servicioRepository.findOne(identificacion, servicio);
    if (!existente) {
      throw new NotFoundError('El servicio no existe');
    }
    await this.servicioRepository.delete(identificacion, servicio);
  }
}
