## Flujo de Trabajo y Gestión de Ramas (Git Workflow)

Para asegurar la calidad del código, evitar conflictos entre desarrolladores y mantener la estabilidad de la rama principal (`main`), el equipo adopta el siguiente flujo de trabajo:

1. **Rama por tarjeta / tarea:**
   * Toda funcionalidad, corrección o documentación se desarrolla en una rama independiente originada desde la versión actualizada de `main`.
   * **Nomenclatura oficial:**
     * `feat/nombre-seccion` (ej. `feat/seccion-hero`, `feat/seccion-problema`)
     * `fix/descripcion-bug` (ej. `fix/padding-mobile`)
     * `docs/nombre-tarea` (ej. `docs/flujo-ramas`)
2. **Desarrollo aislado:**
   * Queda estrictamente restringido realizar `commit` o `push` directo sobre la rama `main`.
3. **Apertura obligatoria de Pull Request (PR):**
   * Al finalizar la tarea y verificarla en el entorno local (`npm run dev`), el desarrollador sube su rama a GitHub y abre un Pull Request hacia `main`.
   * El PR debe describir los cambios implementados y referenciar la tarjeta de Trello correspondiente.
4. **Revisión por pares (Peer Review):**
   * Ningún desarrollador puede aprobar o fusionar (*merge*) su propio código.
   * Es obligatoria la revisión y aprobación formal del otro integrante de DEV (Jairo revisa a Lautaro / Lautaro revisa a Jairo).
   * Criterios de auditoría: ausencia de errores en consola, tipado TypeScript estricto, uso adecuado de Tailwind CSS y diseño adaptativo (*Mobile First*).
5. **Integración continua:**
   * Una vez aprobado el PR, se realiza el merge hacia `main`. Vercel detecta automáticamente el cambio y despliega la nueva versión en producción.

> **Nota sobre maquetas preliminares:**  
> Las secciones visuales integradas actualmente (como el Hero de ejemplo) tienen carácter de maqueta técnica para validar el entorno y los estilos base. Serán sustituidas por los componentes definitivos una vez que las áreas de Marketing (copy) y UX/UI (wireframe y paleta oficial) entreguen los insumos finales.