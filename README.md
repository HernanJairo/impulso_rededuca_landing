# RedEduca - Landing Page Oficial (Grupo 1)

Landing page institucional orientada a presentar la propuesta de valor de RedEduca y relevar instituciones educativas para el piloto.

## Stack Tecnológico
* **Framework:** Next.js (App Router)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS
* **Despliegue continuo:** Vercel
* **Versión Node:** v20 (definido en `.nvmrc`)

## Cómo ejecutar en local

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/HernanJairo/impulso_rededuca_landing.git](https://github.com/HernanJairo/impulso_rededuca_landing.git)
   cd impulso_rededuca_landing

## Flujo de Trabajo y Gestión de Ramas (Git Workflow)

Para asegurar la calidad del código, el trabajo colaborativo y la estabilidad del proyecto, el equipo documenta la evolución y el estándar oficial de ramas:

### 1. Fase Inicial: Puesta a Punto y Línea Base (main)
* En la etapa inicial se configuró el proyecto base directamente sobre la rama principal (`main`), integrando:
  * Un componente preliminar de prueba técnica (`Hero.tsx`) con estilos Tailwind CSS.
  * La estructura de imágenes responsivas en `/public/images/`.
  * La primera validación del circuito colaborativo mediante la rama `docs/flujo-ramas-y-hero`, con Pull Request y revisión por pares aprobada (Peer Review).

---

### 2. Estructura Oficial: Incorporación de Staging
Siguiendo las pautas de coordinación, se formalizan dos ramas base permanentes en el repositorio:
* **`main` (Producción):** Rama estable vinculada al despliegue final en Vercel.
* **`staging` (Entorno de Pruebas):** Creada directamente como bifurcación de la versión actualizada de `main`, destinada a la integración y testeo previo de todas las tareas.

---

### 3. Flujo Oficial de Desarrollo (A partir de la Fase Actual)

1. **Ramas por tarea (Feature branches):**
   * Toda nueva funcionalidad o corrección se inicia siempre a partir de **`staging`**.
   * Nomenclatura: `feat/nombre-seccion`, `fix/descripcion`, `docs/tarea`.
2. **Pull Request obligatorio hacia Staging:**
   * Al finalizar el desarrollo y verificarlo localmente (`npm run dev`), se abre un Pull Request dirigido a **`staging`** (no a `main`).
3. **Revisión por Pares (Peer Review):**
   * Es obligatoria la revisión técnica del otro desarrollador del equipo (revisión cruzada entre Jairo y Lautaro) mediante la función *Approve* de GitHub.
4. **Pase a Producción (`staging` ➔ `main`):**
   * Una vez que las tareas integradas en `staging` funcionan correctamente y sin conflictos, se genera el Pull Request general desde `staging` hacia `main` para publicar la versión oficial.

---

> **Aclaración sobre el Hero actual (Maqueta de Prueba Técnica):**  
> El componente visual del Hero integrado en esta etapa tiene carácter estrictamente experimental. Su único propósito fue poner a prueba el flujo de trabajo (creación de ramas, Pull Request, revisión por pares, carga de assets estáticos y verificación del despliegue en Vercel). No representa el diseño ni los textos definitivos, los cuales serán reemplazados una vez que los equipos de UX/UI y Contenido entreguen los insumos finales