import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideRouter } from '@angular/router';

import { ClienteFormComponent } from './cliente-form.component';

describe('ClienteFormComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteFormComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({}) } } },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  function crearComponente(): ClienteFormComponent {
    const fixture = TestBed.createComponent(ClienteFormComponent);
    fixture.detectChanges();

    httpMock.expectOne('/catalogos/tipos-identificacion').flush({
      success: true,
      message: 'OK',
      errors: [],
      data: [],
    });

    return fixture.componentInstance;
  }

  it('marca el formulario inválido cuando los campos están vacíos', () => {
    const componente = crearComponente();

    expect(componente.form.invalid).toBe(true);
    expect(componente.form.controls.identificacion.hasError('required')).toBe(true);
    expect(componente.form.controls.correoElectronico.hasError('required')).toBe(true);
  });

  it('marca el formulario válido cuando todos los campos son correctos', () => {
    const componente = crearComponente();

    componente.form.setValue({
      identificacion: '123',
      nombres: 'Juan',
      apellidos: 'Pérez',
      tipoIdentificacion: 'CC',
      fechaNacimiento: '1990-01-01',
      numeroCelular: '3001234567',
      correoElectronico: 'juan@example.com',
    });

    expect(componente.form.valid).toBe(true);
  });
});
