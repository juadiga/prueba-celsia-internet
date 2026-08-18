import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Servicio } from '../entities/Servicio';
import { CreateServicioDto } from '../dtos/CreateServicioDto';
import { UpdateServicioDto } from '../dtos/UpdateServicioDto';

export class ServicioRepository {
  private readonly repository: Repository<Servicio>;

  constructor() {
    this.repository = AppDataSource.getRepository(Servicio);
  }

  findAll(): Promise<Servicio[]> {
    return this.repository.find();
  }

  findByIdentificacion(identificacion: string): Promise<Servicio[]> {
    return this.repository.findBy({ identificacion });
  }

  findOne(identificacion: string, servicio: string): Promise<Servicio | null> {
    return this.repository.findOneBy({ identificacion, servicio });
  }

  create(dto: CreateServicioDto): Promise<Servicio> {
    const servicio = this.repository.create(dto);
    return this.repository.save(servicio);
  }

  update(servicio: Servicio, dto: UpdateServicioDto): Promise<Servicio> {
    Object.assign(servicio, dto);
    return this.repository.save(servicio);
  }

  async delete(identificacion: string, servicio: string): Promise<void> {
    await this.repository.delete({ identificacion, servicio });
  }
}
