import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ClienteService } from './cliente.service';
import { ApiSuccessResponse } from '../models/api-response.model';
import { Cliente } from '../models/cliente.model';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService],
    });
    service = TestBed.inject(ClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('hace GET a /clientes y devuelve la lista', () => {
    const clientes: Cliente[] = [
      {
        identificacion: '123',
        nombres: 'Juan',
        apellidos: 'Pérez',
        tipoIdentificacion: 'CC',
        fechaNacimiento: '1990-01-01',
        numeroCelular: '3001234567',
        correoElectronico: 'juan@example.com',
      },
    ];
    const respuesta: ApiSuccessResponse<Cliente[]> = { success: true, message: 'OK', errors: [], data: clientes };

    service.getAll().subscribe((resultado) => expect(resultado).toEqual(clientes));

    const req = httpMock.expectOne('/clientes');
    expect(req.request.method).toBe('GET');
    req.flush(respuesta);
  });

  it('hace POST a /clientes con el body del cliente', () => {
    const nuevoCliente = {
      identificacion: '456',
      nombres: 'Ana',
      apellidos: 'Gómez',
      tipoIdentificacion: 'CC',
      fechaNacimiento: '1992-05-10',
      numeroCelular: '3007654321',
      correoElectronico: 'ana@example.com',
    };
    const respuesta: ApiSuccessResponse<Cliente> = {
      success: true,
      message: 'OK',
      errors: [],
      data: nuevoCliente,
    };

    service.create(nuevoCliente).subscribe((resultado) => expect(resultado).toEqual(nuevoCliente));

    const req = httpMock.expectOne('/clientes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevoCliente);
    req.flush(respuesta);
  });
});
