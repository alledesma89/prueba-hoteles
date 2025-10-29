# Decisiones Técnicas

## 1. Framework y Herramientas

### Angular v20
- **Razón**: Framework maduro con fuerte tipado y herramientas robustas
- **Beneficios**:
  - Standalone components para mejor tree-shaking
  - Desarrollo modular y mantenible
  - Herramientas de desarrollo integradas

### JSON Server
- **Razón**: Rápida implementación de API mock
- **Beneficios**:
  - Desarrollo frontend sin dependencia de backend real
  - API RESTful completa con zero config
  - Soporte para queries complejas y filtrado

## 2. UI/UX

### Bootstrap
- **Razón**: Framework CSS maduro y bien documentado
- **Beneficios**:
  - Diseño responsive out-of-the-box
  - Componentes pre-estilizados
  - Gran comunidad y soporte

### Animate.css & Vanilla-tilt
- **Razón**: Mejora de experiencia de usuario
- **Beneficios**:
  - Animaciones optimizadas y cross-browser
  - Efectos interactivos sin overhead
  - Fácil integración y personalización

## 3. Arquitectura

### Standalone Components
- **Razón**: Mejor modularidad y mantenibilidad
- **Beneficios**:
  - Tree-shaking más eficiente
  - Configuración más simple
  - Mejor separación de responsabilidades

### Servicios Centralizados
- **Razón**: Separación clara de lógica de negocio
- **Beneficios**:
  - Reutilización de código
  - Testing más sencillo
  - Mejor mantenibilidad

## 4. Testing

### Unit Testing
- **Razón**: Asegurar calidad de código
- **Beneficios**:
  - Detección temprana de bugs
  - Documentación viva
  - Refactoring seguro

## 5. Decisiones de Performance

### Paginación
- **Razón**: Manejo eficiente de grandes conjuntos de datos
- **Beneficios**:
  - Mejor tiempo de carga inicial
  - Menor uso de memoria
  - Mejor experiencia de usuario

### Lazy Loading
- **Razón**: Optimización de carga inicial
- **Beneficios**:
  - Bundle más pequeño
  - Carga más rápida
  - Mejor rendimiento