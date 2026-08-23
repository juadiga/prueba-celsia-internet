import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AlertComponent } from '../../../shared/alert/alert.component';
import { pastDateValidator } from '../../../shared/validators/past-date.validator';
import { TipoIdentificacion } from '../../../core/models/catalogo.model';
import { CatalogoService } from '../../../core/services/catalogo.service';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AlertComponent],
  templateUrl: './cliente-form.component.html',
})
export class ClienteFormComponent implements OnInit {
  tiposIdentificacion: TipoIdentificacion[] = [];
  modoEdicion = false;
  guardando = false;
  mensajeError: string | null = null;

  form = this.fb.nonNullable.group({
    identificacion: ['', [Validators.required, Validators.maxLength(20)]],
    nombres: ['', [Validators.required, Validators.maxLength(80)]],
    apellidos: ['', [Validators.required, Validators.maxLength(80)]],
    tipoIdentificacion: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required, pastDateValidator()]],
    numeroCelular: ['', [Validators.required, Validators.maxLength(20)]],
    correoElectronico: ['', [Validators.required, Validators.maxLength(80), Validators.email]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly catalogoService: CatalogoService,
    private readonly clienteService: ClienteService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.catalogoService.getTiposIdentificacion().subscribe((tipos) => (this.tiposIdentificacion = tipos));

    const identificacion = this.route.snapshot.paramMap.get('identificacion');
    if (identificacion) {
      this.modoEdicion = true;
      this.form.controls.identificacion.disable();
      this.clienteService.getByIdentificacion(identificacion).subscribe({
        next: (cliente) => this.form.patchValue(cliente),
        error: (err: Error) => (this.mensajeError = err.message),
      });
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

    const peticion = this.modoEdicion
      ? this.clienteService.update(valor.identificacion, valor)
      : this.clienteService.create(valor);

    peticion.subscribe({
      next: () =>
        this.router.navigate(['/clientes'], {
          state: { mensajeExito: this.modoEdicion ? 'Cliente actualizado' : 'Cliente creado' },
        }),
      error: (err: Error) => {
        this.mensajeError = err.message;
        this.guardando = false;
      },
    });
  }
}
