# Colección Postman

Archivos versionados para probar la API sin escribir peticiones a mano.

| Archivo | Qué es |
|---|---|
| `prueba-celsia-internet.postman_collection.json` | Colección (schema v2.1) con los 13 endpoints + casos de error |
| `prueba-celsia-internet.postman_environment.json` | Entorno local (`baseUrl`, `identificacion`, `servicio`) |

## Uso

1. Postman → **Import** → arrastrar ambos archivos.
2. Seleccionar el entorno **Celsia Internet - Local** (arriba a la derecha).
3. Levantar la API (`cd api && npm run dev`, o `docker compose -f api/docker-compose.yml up -d`).

Orden sugerido para un recorrido completo:

`GET /health` → catálogos → `POST /clientes` → `POST /clientes` (duplicado, 409) →
`POST /servicios` → `POST /servicios` (duplicado, 409) → `POST /servicios` (cliente
inexistente, 404) → `GET /clientes/:identificacion/servicios` → `PUT` → `DELETE`
servicio → `DELETE` cliente.

## Variables

| Variable | Valor por defecto |
|---|---|
| `baseUrl` | `http://localhost:3000/api` |
| `identificacion` | `1020304050` |
| `servicio` | `Internet 200 MB` |

La colección trae los mismos valores como variables propias, así que funciona
también sin importar el entorno.
