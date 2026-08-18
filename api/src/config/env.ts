import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno requerida: ${name}`);
  }
  return value;
}

function requiredNumber(name: string): number {
  const value = Number(required(name));
  if (Number.isNaN(value)) {
    throw new Error(`La variable de entorno ${name} debe ser numérica`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: requiredNumber('PORT'),
  db: {
    host: required('DB_HOST'),
    port: requiredNumber('DB_PORT'),
    username: required('DB_USERNAME'),
    password: required('DB_PASSWORD'),
    database: required('DB_DATABASE'),
  },
} as const;
