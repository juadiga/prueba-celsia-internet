import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AlertComponent } from '../../shared/alert/alert.component';
import { Cliente } from '../../core/models/cliente.model';
import { ClienteService } from '../../core/services/cliente.service';
import { Servicio } from '../../core/models/servicio.model';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AlertComponent],
  templateUrl: './consulta.component.html',
})
export class ConsultaComponent implements OnInit {
  identificacion = '';
  cliente: Cliente | null = null;
  servicios: Servicio[] = [];
  buscando = false;
  buscado = false;
  mensajeError: string | null = null;
  mensajeExito: string | null = null;

  constructor(
    private readonly clienteService: ClienteService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const mensajeExito = history.state?.mensajeExito as string | undefined;
    if (mensajeExito) {
      this.mensajeExito = mensajeExito;
    }

    const identificacion = this.route.snapshot.queryParamMap.get('identificacion');
    if (identificacion) {
      this.identificacion = identificacion;
      this.buscar();
    }
  }

  buscar(): void {
    if (!this.identificacion.trim()) {
      return;
    }

    this.buscando = true;
    this.buscado = false;
    this.mensajeError = null;
    this.cliente = null;
    this.servicios = [];

    this.clienteService.getConServicios(this.identificacion.trim()).subscribe({
      next: ({ cliente, servicios }) => {
        this.cliente = cliente;
        this.servicios = servicios;
        this.buscando = false;
        this.buscado = true;
      },
      error: (err: Error) => {
        this.mensajeError = err.message;
        this.buscando = false;
        this.buscado = true;
      },
    });
  }
}
