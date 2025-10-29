# Instalación y Ejecución de la Aplicación

## Descripción General

Esta aplicación está desarrollada utilizando Angular v20 y consta de dos partes:
- Frontend: Una SPA (Single Page Application) para visualización y filtrado de hoteles
- Backend: Una API REST simulada con json-server que proporciona los datos

## Requisitos Previos

- Node.js v18 o superior
- npm v9 o superior
- Angular CLI v20

## Pasos de Instalación

1. **Instalación de dependencias**
```bash
npm install
```

2. **Generación de datos de prueba**
```bash
npm run generate-db
```
Este comando generará el archivo `db.json` con datos aleatorios de hoteles utilizando faker-js.

## Ejecución del Proyecto

La aplicación puede iniciarse de dos formas:

### Opción 1: Inicio Conjunto (Recomendado)
```bash
npm run start
```
Este comando iniciará tanto el servidor de desarrollo de Angular como json-server utilizando concurrently.

### Opción 2: Inicio por Separado
Si necesitas más control sobre cada proceso, puedes ejecutar cada servicio en terminales separadas:

Terminal 1 (API):
```bash
npx json-server --watch db.json
```

Terminal 2 (Angular):
```bash
ng serve
```

## Acceso a la Aplicación

- Frontend: [http://localhost:4200](http://localhost:4200)
- API: [http://localhost:3000/hotels](http://localhost:3000/hotels)

## Funcionalidades Implementadas

- Listado de hoteles con paginación
- Filtros:
  - Búsqueda por nombre
  - Filtro por categoría (estrellas)
  - Filtro por valoración
  - Filtro por precio
- Diseño responsive con Bootstrap
- Efectos visuales interactivos en las tarjetas

## Notas Técnicas

- Se utiliza json-server para simular una API REST
- Los datos se generan dinámicamente con faker-js
- La aplicación implementa características modernas de Angular como:
  - Standalone Components
  - Control Flow (@if, @for)
  - Signals (donde aplicable)
  - Lazy Loading para optimización

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── filters/
│   │   └── hotel-list/
│   ├── services/
│   └── shared/
├── assets/
└── styles/
```

## Posibles Problemas y Soluciones

1. **Error: EADDRINUSE**
   - El puerto 3000 o 4200 está en uso
   - Solución: Cerrar otras instancias o cambiar el puerto

2. **Error: Cannot find module**
   - Ejecutar `npm install` nuevamente

## Mejoras Futuras

- Implementación de caché para optimizar requests
- Añadir más pruebas unitarias
- Implementar PWA para funcionamiento offline