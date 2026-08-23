export const TIPOS_IDENTIFICACION = [
  { valor: 'CC', descripcion: 'Cédula' },
  { valor: 'TI', descripcion: 'Tarjeta de identidad' },
  { valor: 'CE', descripcion: 'Cédula de extranjería' },
  { valor: 'RC', descripcion: 'Registro civil' },
] as const;

export type TipoIdentificacion = (typeof TIPOS_IDENTIFICACION)[number]['valor'];

export const TIPOS_IDENTIFICACION_VALORES: readonly string[] = TIPOS_IDENTIFICACION.map((t) => t.valor);

export const SERVICIOS = [
  'Internet 200 MB',
  'Internet 400 MB',
  'Internet 600 MB',
  'Directv Go',
  'Paramount+',
  'Win+',
] as const;

export type ServicioNombre = (typeof SERVICIOS)[number];

export const SERVICIOS_VALORES: readonly string[] = SERVICIOS;
