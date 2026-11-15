@AGENTS.md

# CLAUDE.md - Landing Page (RedEduca)

## 1. OBJETIVOS Y REGLAS ODDD (Outcome-Driven)

- **Propósito:** Landing page comercial e institucional de RedEduca (captación de leads, explicación de módulos y programa piloto).
- **Convenciones:**
  - Código, archivos, tipos y funciones en **inglés**.
  - Comentarios y textos visibles en la UI en **español**.
- **Pie de página obligatorio:** Debe mostrar exactamente: _"Creado por alumnos de IES N° 6 de Perico, Jujuy, Argentina"_.
- **Endpoint API:** `NEXT_PUBLIC_API_URL=https://impulso-rededuca-g1-api.onrender.com`.

## 2. MAPA TÉCNICO CDD (Context-Driven)

- **Directorio clave:** `components/formulario/FormularioSection.tsx`, `components/hero/`, `components/navegacion/`, `app/page.tsx`.

## 3. TAREA PENDIENTE DE QA (ÚNICO FOCO DE MODIFICACIÓN)

- [ ] **Formulario de Postulación al Programa Piloto (`FormularioSection.tsx`):**
  - **Incidencia detectada:** El campo de contacto ("WhatsApp o email") limita la entrada a 15 caracteres pero permite ingresar caracteres especiales o guiones al final antes del envío (ej: `388388388388-`).
  - **Solución requerida:** Implementar una validación mediante **Regex** o una máscara de entrada estricta en el campo de contacto para evitar caracteres inválidos o guiones sobrantes al final antes de permitir el envío del formulario.
