import { ServicioService } from './servicio.service';
import { ServicioRepository } from '../repositories/servicio.repository';
import { ClienteRepository } from '../repositories/cliente.repository';
import { ConflictError } from '../exceptions/ConflictError';
import { NotFoundError } from '../exceptions/NotFoundError';
import { Cliente } from '../entities/Cliente';
import { Servicio } from '../entities/Servicio';
import { CreateServicioDto } from '../dtos/CreateServicioDto';

function buildCliente(): Cliente {
  return { identificacion: '123' } as Cliente;
}

function buildServicio(overrides: Partial<Servicio> = {}): Servicio {
  return {
    identificacion: '123',
    servicio: 'Internet 200 MB',
    fechaInicio: '2024-01-01',
    ultimaFacturacion: '2024-01-01',
    ultimoPago: 50000,
    ...overrides,
  } as Servicio;
}

describe('ServicioService', () => {
  let servicioRepository: jest.Mocked<ServicioRepository>;
  let clienteRepository: jest.Mocked<ClienteRepository>;
  let service: ServicioService;

  beforeEach(() => {
    servicioRepository = {
      findAll: jest.fn(),
      findByIdentificacion: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ServicioRepository>;
    clienteRepository = {
      findAll: jest.fn(),
      findByIdentificacion: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ClienteRepository>;
    service = new ServicioService(servicioRepository, clienteRepository);
  });

  describe('create', () => {
    const dto = buildServicio() as unknown as CreateServicioDto;

    it('lanza NotFoundError cuando el cliente no existe', async () => {
      clienteRepository.findByIdentificacion.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toMatchObject(
        new NotFoundError('El cliente no existe'),
      );
      expect(servicioRepository.create).not.toHaveBeenCalled();
    });

    it('lanza ConflictError cuando la pareja identificacion+servicio ya existe', async () => {
      clienteRepository.findByIdentificacion.mockResolvedValue(buildCliente());
      servicioRepository.findOne.mockResolvedValue(buildServicio());

      await expect(service.create(dto)).rejects.toMatchObject(
        new ConflictError('El registro ya existe'),
      );
      expect(servicioRepository.create).not.toHaveBeenCalled();
    });

    it('crea el servicio cuando el cliente existe y no hay duplicado', async () => {
      clienteRepository.findByIdentificacion.mockResolvedValue(buildCliente());
      servicioRepository.findOne.mockResolvedValue(null);
      servicioRepository.create.mockResolvedValue(buildServicio());

      const resultado = await service.create(dto);

      expect(resultado.servicio).toBe('Internet 200 MB');
      expect(servicioRepository.create).toHaveBeenCalledWith(dto);
    });
  });
});
