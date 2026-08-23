import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Cliente } from '../entities/Cliente';
import { CreateClienteDto } from '../dtos/CreateClienteDto';
import { UpdateClienteDto } from '../dtos/UpdateClienteDto';

export class ClienteRepository {
  private readonly repository: Repository<Cliente>;

  constructor() {
    this.repository = AppDataSource.getRepository(Cliente);
  }

  findAll(): Promise<Cliente[]> {
    return this.repository.find();
  }

  findByIdentificacion(identificacion: string): Promise<Cliente | null> {
    return this.repository.findOneBy({ identificacion });
  }

  create(dto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.repository.create(dto);
    return this.repository.save(cliente);
  }

  update(cliente: Cliente, dto: UpdateClienteDto): Promise<Cliente> {
    Object.assign(cliente, dto);
    return this.repository.save(cliente);
  }

  async delete(identificacion: string): Promise<void> {
    await this.repository.delete({ identificacion });
  }
}
