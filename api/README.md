# API — prueba-celsia-internet

Backend de la prueba técnica de Celsia Internet S.A.S.: CRUD de clientes y de
los servicios de internet que tienen contratados. Node.js 20 + Express +
TypeScript + TypeORM sobre MySQL 8. Sin autenticación (fuera de alcance).

## Instalación

Requiere Node.js 20 LTS (versión fijada en `.nvmrc`):

```bash
nvm use   # usa la versión de .nvmrc
npm install
cp .env.example .env   # ajustar credenciales de MySQL si aplica
```

## Ejecución en desarrollo

Requiere una instancia de MySQL 8 accesible con los datos de `.env`.

```bash
npm run migration:run   # crea el esquema (clientes, servicios)
npm run dev              # levanta con recarga en caliente, puerto 3000
```

## Build de producción

```bash
npm run build   # compila a dist/
npm start        # node dist/server.js
```

## Ejecución con Docker

Este proyecto trae su propio `docker-compose.yml` con dos servicios: `db`
(MySQL 8) y `api`. Ambos declaran la política de logs `json-file`
(`max-size: 10m`, `max-file: 3`) y se conectan a la red externa `celsia-net`,
compartida con la webapp.

```bash
docker network create celsia-net     # una sola vez
cp .env.example .env
docker compose up -d --build
docker compose logs -f api
```

- La imagen es multi-stage (`node:20-alpine` para compilar → runtime con solo
  `dist/` y dependencias de producción) y corre como usuario no root (`node`).
- El esquema lo crea `init.sql`, montado en `/docker-entrypoint-initdb.d` del
  contenedor de MySQL; se ejecuta la primera vez que se inicializa el volumen
  `celsia-mysql-data`. En desarrollo local el equivalente es
  `npm run migration:run`.
- `api` espera a que el `healthcheck` de MySQL (`mysqladmin ping`) pase
  (`depends_on: condition: service_healthy`).

```bash
docker compose down       # detener
docker compose down -v    # detener y borrar el volumen (base desde cero)
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `NODE_ENV` | `development` \| `production`. Afecta nivel de logs y logging de queries. |
| `PORT` | Puerto HTTP del servicio (por defecto `3000`). |
| `CORS_ORIGIN` | Orígenes permitidos para CORS, separados por coma (URL del frontend). |
| `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` | Conexión a MySQL. |

## Pruebas

Jest + ts-jest sobre la capa de reglas de negocio (`services/`), con los
repositorios mockeados: no requieren MySQL.

```bash
npm test        # modo local
npm run test:ci # el que corre en el pipeline
```

## Endpoints

```
GET    /api/health          # 200 si la base responde, 503 si no

GET    /api/catalogos/tipos-identificacion
GET    /api/catalogos/servicios

GET    /api/clientes
GET    /api/clientes/:identificacion
GET    /api/clientes/:identificacion/servicios
POST   /api/clientes
PUT    /api/clientes/:identificacion
DELETE /api/clientes/:identificacion

GET    /api/servicios
POST   /api/servicios
PUT    /api/servicios/:identificacion/:servicio
DELETE /api/servicios/:identificacion/:servicio
```

Formato de respuesta uniforme en toda la API:

```json
{ "success": true, "message": "OK", "errors": [], "data": {} }
{ "success": false, "message": "El registro ya existe", "errors": [] }
```

### Códigos de respuesta relevantes

| Caso | Código | Mensaje |
|---|---|---|
| Cliente o servicio duplicado | `409` | `El registro ya existe` |
| Servicio de un cliente inexistente | `404` | `El cliente no existe` |
| Borrar un cliente con servicios contratados | `409` | `El cliente tiene servicios contratados y no puede ser eliminado` |
| Base de datos sin responder (`/api/health`) | `503` | `Servicio no disponible: la base de datos no responde` |


## Patrones de diseño aplicados

- **Repository** (`repositories/`) — aísla TypeORM del resto de capas. Los
  services no conocen `Repository<T>` de TypeORM directamente, solo el
  contrato del repository propio (`ClienteRepository`, `ServicioRepository`).
- **DTO + Mapper** (`dtos/`) — las entidades de TypeORM nunca se exponen tal
  cual en las respuestas. Cada dominio tiene su `ResponseDto` y una función
  `toXResponseDto()` que hace el mapeo explícito.
- **Dependency Injection por constructor** — `ClienteService` y
  `ServicioService` reciben sus repositorios por constructor en vez de
  instanciarlos internamente; facilita testear cada capa de forma aislada.
- **Singleton** — `AppDataSource` (`config/data-source.ts`) se crea una sola
  vez a nivel de módulo y se reutiliza en todos los repositorios.
- **Middleware / Chain of Responsibility** — `asyncHandler` envuelve cada
  handler async y delega los errores a `errorHandler`, que es el único punto
  que traduce `AppError` (y sus subclases `ConflictError`, `NotFoundError`,
  `ValidationError`) al formato de respuesta HTTP. El middleware `validate`
  aplica los validadores del DTO correspondiente antes de llegar al
  controlador.
- **Factory** (`factories/apiResponse.factory.ts`) — `successResponse()` y
  `errorResponse()` centralizan la construcción del sobre
  `{ success, message, errors, data }`, evitando repetir el literal en cada
  controlador y en el `errorHandler`.

## Notas de implementación

- `synchronize: false`; el esquema se crea con migraciones de TypeORM
  (`src/migrations/`). `init.sql` en la raíz de `api/` es el respaldo que se
  monta en el contenedor de MySQL para levantar el esquema desde cero.
- Las reglas de negocio de `servicios` validan primero la existencia del
  cliente (`404 El cliente no existe`) y luego el duplicado por
  `identificacion + servicio` (`409 El registro ya existe`).
- Logs estructurados con Winston (JSON) a `stdout`, alimentados también por
  Morgan (`combined`) para el log de acceso HTTP — los recoge Docker según la
  política de logging del `docker-compose.yml`.
