# prueba-celsia-internet

Prueba técnica para **Celsia Internet S.A.S.**: registro y consulta de
clientes y los servicios de internet que tienen contratados, con backend,
frontend y despliegue en contenedores.

> Este README es provisional (Fase 0). Se completa en la Fase 13 con
> arquitectura, instrucciones de despliegue y las respuestas teóricas.

## Alcance

- CRUD de clientes y de sus servicios contratados.
- Validaciones de campos obligatorios, tipos/longitudes según la base de
  datos, y de registro duplicado (`"El registro ya existe"`).
- Formulario de contratación de servicios con integridad referencial.
- Consulta de un cliente y sus servicios por número de identificación.

## Restricciones

- **Sin autenticación.** No hay JWT, login, roles ni guards. La seguridad se
  responde de forma teórica en este README, no se implementa.
- No se cambian nombres de tablas ni columnas del modelo de datos entregado.
- No se sobredimensiona la solución: microservicios, colas o caché
  distribuido son respuestas teóricas, no parte de la implementación.

## Estructura del repositorio

```
api/       # Backend — Node.js 20 + Express + TypeScript + TypeORM + MySQL
webapp/    # Frontend — Angular 17+ (standalone) + Bootstrap 5
assets/    # Diagrama de arquitectura (diagrama.png)
```

## Git-flow

```
main
 |-- develop
      |-- <desarrollador>
```

Se trabaja en la rama del desarrollador, se integra a `develop`, y de
`develop` a `main` solo al finalizar la prueba.
