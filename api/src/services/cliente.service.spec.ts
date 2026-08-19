import { ClienteService } from './cliente.service';
import { ClienteRepository } from '../repositories/cliente.repository';
import { ConflictError } from '../exceptions/ConflictError';
import { NotFoundError } from '../exceptions/NotFoundError';
import { Cliente } from '../entities/Cliente';
import { CreateClienteDto } from '../dtos/CreateClienteDto';

function buildCliente(overrides: Partial<Cliente> = {}): Cliente {
  return {
    identificacion: '123',
    nombres: 'Juan',
    apellidos: 'Pérez',
    tipoIdentificacion: 'CC',
    fechaNacimiento: '1990-01-01',
    numeroCelular: '3001234567',
    correoElectronico: 'juan@example.com',
    servicios: [],
    ...overrides,
  } as Cliente;
}

describe('ClienteService', () => {
  let repository: jest.Mocked<ClienteRepository>;
  let service: ClienteService;

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      findByIdentificacion: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ClienteRepository>;
    service = new ClienteService(repository);
  });

  describe('create', () => {
    it('crea el cliente cuando la identificación no existe', async () => {
      const dto = buildCliente() as unknown as CreateClienteDto;
      repository.findByIdentificacion.mockResolvedValue(null);
      repository.create.mockResolvedValue(buildCliente());

      const resultado = await service.create(dto);

      expect(resultado.identificacion).toBe('123');
      expect(repository.create).toHaveBeenCalledWith(dto);
    });

    it('lanza ConflictError con el mensaje literal cuando la identificación ya existe', async () => {
      const dto = buildCliente() as unknown as CreateClienteDto;
      repository.findByIdentificacion.mockResolvedValue(buildCliente());

      await expect(service.create(dto)).rejects.toMatchObject(
        new ConflictError('El registro ya existe'),
      );
      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  describe('findByIdentificacion', () => {
    it('lanza NotFoundError cuando el cliente no existe', async () => {
      repository.findByIdentificacion.mockResolvedValue(null);

      await expect(service.findByIdentificacion('999')).rejects.toMatchObject(
        new NotFoundError('El cliente no existe'),
      );
    });
  });
});
