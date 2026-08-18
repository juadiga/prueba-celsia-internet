import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Servicio } from './Servicio';

@Entity('clientes')
export class Cliente {
  @PrimaryColumn({ name: 'identificacion', type: 'varchar', length: 20 })
  identificacion!: string;

  @Column({ name: 'nombres', type: 'varchar', length: 80 })
  nombres!: string;

  @Column({ name: 'apellidos', type: 'varchar', length: 80 })
  apellidos!: string;

  @Column({ name: 'tipoIdentificacion', type: 'varchar', length: 2 })
  tipoIdentificacion!: string;

  @Column({ name: 'fechaNacimiento', type: 'date' })
  fechaNacimiento!: string;

  @Column({ name: 'numeroCelular', type: 'varchar', length: 20 })
  numeroCelular!: string;

  @Column({ name: 'correoElectronico', type: 'varchar', length: 80 })
  correoElectronico!: string;

  @OneToMany(() => Servicio, (servicio) => servicio.cliente)
  servicios!: Servicio[];
}
