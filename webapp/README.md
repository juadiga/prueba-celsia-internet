# Webapp — Celsia Internet

Frontend en Angular para el registro y consulta de clientes y sus servicios de
internet contratados. Consume la API descrita en `../api/README.md`.

## Requisitos

- Node.js 20 LTS
- Angular CLI 17+ (`npm install -g @angular/cli`, opcional; también se puede
  usar `npx ng`)

## Instalación

```bash
cd webapp
npm install
```

## Variables de entorno

La URL del API se lee de los archivos de entorno de Angular, no se hardcodea
en los componentes:

| Archivo | Uso | `apiUrl` |
|---|---|---|
| `src/environments/environment.development.ts` | `ng serve` (desarrollo) | `http://localhost:3000/api` |
| `src/environments/environment.ts` | `ng build` (producción) | `http://localhost:3000/api` |

Si el API se despliega en otra URL, ajustar `apiUrl` en el archivo
correspondiente antes de compilar.

## Ejecución

```bash
npm start
```

Levanta el servidor de desarrollo en `http://localhost:4200`. Requiere que la
API esté corriendo (ver `../api/README.md`) para que las pantallas puedan
cargar catálogos y datos.

## Build de producción

```bash
npm run build
```

Genera los artefactos en `dist/webapp`, servidos por Nginx en el contenedor
(ver `Dockerfile`).

## Estructura

```
src/app/
|-- core/         # ApiService, HttpInterceptor, modelos, servicios por dominio
|-- shared/       # AlertComponent, validadores reutilizables
|-- features/
    |-- clientes/     # listado y formulario de clientes
    |-- servicios/    # formulario de contratación de servicios
    |-- consulta/     # consulta por identificación
```

Standalone components, sin `NgModule`. Rutas con carga perezosa
(`loadComponent`) en `app.routes.ts`.

## Pantallas

1. **Listado de clientes** (`/clientes`) — tabla con acciones crear, editar,
   eliminar, consultar y acceso directo a contratar un servicio.
2. **Formulario de cliente** (`/clientes/nuevo`, `/clientes/:id/editar`) —
   selects de `tipoIdentificacion` poblados desde `GET /api/catalogos/...`.
3. **Formulario de contratación** (`/servicios/nuevo`) — valida que el cliente
   exista (`GET /api/clientes/:id`) antes de enviar la contratación, y
   muestra el mensaje del backend si de todos modos falla (404 o 409).
4. **Consulta por identificación** (`/consulta`) — datos del cliente y tabla
   de servicios contratados, con estados de carga y "sin resultados".

## Validaciones

Los formularios replican en el frontend las mismas reglas que valida el
backend (campos obligatorios, longitudes de `VARCHAR`, formato de correo,
fecha de nacimiento en el pasado, `ultimoPago` entero ≥ 0, catálogos
cerrados). El backend sigue siendo la autoridad: los mensajes de error de
duplicado ("El registro ya existe") e integridad referencial ("El cliente no
existe") se muestran tal cual los devuelve la API.

## Patrones de diseño aplicados

- **Service Layer** (`core/services/*.service.ts`) — `ClienteService`,
  `ServicioService` y `CatalogoService` encapsulan las llamadas HTTP por
  dominio; los componentes nunca llaman a `HttpClient` directamente.
- **Facade** — `ApiService` es una fachada sobre `HttpClient` que centraliza
  la extracción de `data` desde el sobre `{ success, message, errors, data }`
  de la API, para que los servicios de dominio no repitan ese detalle.
- **Interceptor** (`core/interceptors/api.interceptor.ts`) — resuelve la URL
  base contra `environment.apiUrl` y normaliza los errores HTTP a un
  `Error` con el mensaje que ya viene armado del backend, para que los
  componentes solo necesiten mostrar `err.message`.
- **Observer (RxJS)** — todas las respuestas HTTP se consumen como
  `Observable` (`.subscribe({ next, error })`); los estados de carga
  (`cargando`, `buscando`, `guardando`) se derivan de esos eventos.
- **Container/Presentational** — los componentes de `features/` actúan como
  contenedores (manejan estado, llaman servicios, navegan); `AlertComponent`
  en `shared/` es puramente presentacional y recibe todo por `@Input`.

Ver `../README.md` (punto 2.4 de la prueba teórica) para la justificación
general de patrones usados en toda la solución.
