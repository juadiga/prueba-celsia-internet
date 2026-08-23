import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cliente } from './Cliente';

@Entity('servicios')
export class Servicio {
  @PrimaryColumn({ name: 'identificacion', type: 'varchar', length: 20 })
  identificacion!: string;

  @PrimaryColumn({ name: 'servicio', type: 'varchar', length: 80 })
  servicio!: string;

  @Column({ name: 'fechaInicio', type: 'date' })
  fechaInicio!: string;

  @Column({ name: 'ultimaFacturacion', type: 'date' })
  ultimaFacturacion!: string;

  @Column({ name: 'ultimoPago', type: 'int', default: 0 })
  ultimoPago!: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.servicios, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'identificacion', foreignKeyConstraintName: 'servicios_FK1' })
  cliente!: Cliente;
}
