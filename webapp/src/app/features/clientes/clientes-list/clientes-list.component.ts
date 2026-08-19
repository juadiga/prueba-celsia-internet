import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AlertComponent } from '../../../shared/alert/alert.component';
import { Cliente } from '../../../core/models/cliente.model';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [CommonModule, RouterLink, AlertComponent],
  templateUrl: './clientes-list.component.html',
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];
  cargando = false;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private readonly clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.clienteService.getAll().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.cargando = false;
      },
      error: (err: Error) => {
        this.mensajeError = err.message;
        this.cargando = false;
      },
    });
  }

  eliminar(cliente: Cliente): void {
    const confirmado = confirm(`¿Eliminar al cliente ${cliente.nombres} ${cliente.apellidos}?`);
    if (!confirmado) {
      return;
    }

    this.clienteService.delete(cliente.identificacion).subscribe({
      next: () => {
        this.mensajeExito = 'Cliente eliminado';
        this.cargarClientes();
      },
      error: (err: Error) => {
        this.mensajeError = err.message;
      },
    });
  }
}
