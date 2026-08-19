import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AlertComponent } from '../../../shared/alert/alert.component';
import { nonNegativeIntegerValidator } from '../../../shared/validators/non-negative-integer.validator';
import { CatalogoService } from '../../../core/services/catalogo.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { ServicioService } from '../../../core/services/servicio.service';

@Component({
  selector: 'app-servicio-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AlertComponent],
  templateUrl: './servicio-form.component.html',
})
export class ServicioFormComponent implements OnInit {
  serviciosDisponibles: string[] = [];
  guardando = false;
  mensajeError: string | null = null;

  form = this.fb.nonNullable.group({
    identificacion: ['', [Validators.required, Validators.maxLength(20)]],
    servicio: ['', [Validators.required]],
    fechaInicio: ['', [Validators.required]],
    ultimaFacturacion: ['', [Validators.required]],
    ultimoPago: [0, [Validators.required, Validators.min(0), nonNegativeIntegerValidator()]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly catalogoService: CatalogoService,
    private readonly clienteService: ClienteService,
    private readonly servicioService: ServicioService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.catalogoService.getServicios().subscribe((servicios) => (this.serviciosDisponibles = servicios));

    const identificacion = this.route.snapshot.queryParamMap.get('identificacion');
    if (identificacion) {
      this.form.controls.identificacion.setValue(identificacion);
    }
  }

  invalido(campo: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[campo];
    return control.invalid && (control.dirty || control.touched);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.mensajeError = null;
    const valor = this.form.getRawValue();

    this.clienteService.getByIdentificacion(valor.identificacion).subscribe({
      next: () => this.contratarServicio(valor),
      error: (err: Error) => {
        this.mensajeError = err.message;
        this.guardando = false;
      },
    });
  }

  private contratarServicio(valor: ReturnType<typeof this.form.getRawValue>): void {
    this.servicioService.create(valor).subscribe({
      next: () =>
        this.router.navigate(['/consulta'], {
          queryParams: { identificacion: valor.identificacion },
          state: { mensajeExito: 'Servicio contratado' },
        }),
      error: (err: Error) => {
        this.mensajeError = err.message;
        this.guardando = false;
      },
    });
  }
}
