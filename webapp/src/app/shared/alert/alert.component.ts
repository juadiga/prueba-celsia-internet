import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    @if (message) {
      <div class="alert alert-{{ type }} alert-dismissible fade show" role="alert">
        {{ message }}
        <button type="button" class="btn-close" aria-label="Cerrar" (click)="dismiss()"></button>
      </div>
    }
  `,
})
export class AlertComponent {
  @Input() type: 'success' | 'danger' = 'success';
  @Input() message: string | null = null;

  dismiss(): void {
    this.message = null;
  }
}
