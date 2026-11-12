# RedEduca - Landing Page Institucional (Grupo 1)

Landing page oficial orientada a presentar la propuesta de valor de RedEduca y relevar instituciones educativas para el programa piloto 2026.

---

## 📖 Descripción del Proyecto y Propósito

RedEduca es un ecosistema digital diseñado para acompañar a las comunidades escolares en la organización de su información institucional y la unificación de sus canales de comunicación. 

El objetivo primordial de esta landing page es validar el interés del sector educativo, comunicar con claridad las problemáticas que resuelve la plataforma y captar directivos y docentes interesados en participar del piloto inicial mediante un formulario de postulación.

---

## 🧭 Manual de Uso y Recorrido de la Landing Page

Esta sección detalla cómo interactúa el usuario (directivo, docente o visitante) con la interfaz:

### 1. Barra de Navegación (Header / Navbar)
* **Navegación fluida por anclaje:** El visitante puede hacer clic en cualquiera de los enlaces (*Inicio*, *El Problema*, *Propuesta*, *Comunidad*, *Piloto*, *Contacto*) para desplazarse de forma suave hacia la sección correspondiente de la página sin recargar el navegador.
* **Comportamiento en Scroll:** Al descender más de 15 píxeles, la barra aplica automáticamente un fondo traslúcido con desenfoque (`backdrop-blur`) y sombra para garantizar la legibilidad continua sobre cualquier contenido.
* **Acceso Rápido al Formulario (CTA):** En cualquier momento, el usuario puede pulsar el botón verde destacado *"Quiero que mi institución participe"* para ir directamente a la sección de registro.
* **Uso en Dispositivos Móviles:** En pantallas táctiles, se despliega el menú hamburguesa tocando el ícono superior derecho. Al seleccionar cualquier sección o el botón de postulación, el menú se cierra automáticamente y el scroll de la página vuelve a quedar libre.

### 2. Sección Principal (Hero)
* **Lectura de la Propuesta de Valor:** Presenta el badge institucional del piloto 2026 y el mensaje central *"Educación conectada. Impacto real."*.
* **Acción Primaria:** El botón principal *"Quiero que mi institución participe"* guía al usuario hacia la postulación institucional.
* **Acción Secundaria:** El botón *"Conocer más"* desplaza la vista de inmediato hacia la sección *El Problema* para que el visitante profundice en los fundamentos del proyecto.

### 3. Sección "El Problema" (Tarjetas Interactivas)
* **Exploración de Problemáticas:** La sección detalla las tres fricciones críticas que sufren las instituciones: *Información dispersa*, *Comunicación fragmentada* y *Tareas administrativas repetitivas*.
* **Interacción tipo Acordeón:** 
  - El usuario hace clic sobre cualquiera de las tres tarjetas para desplegar su contenido.
  - Al abrirse una tarjeta, se muestra la descripción extendida y tres puntos clave destacados con viñetas institucionales.
  - Al hacer clic en una tarjeta diferente o sobre la misma, el contenido se pliega suavemente mediante transiciones fluidas.

### 4. Pie de Página (Footer)
* **Redes y Comunidad:** Contiene accesos directos a los canales oficiales (Facebook, Instagram, WhatsApp, X) que se abren en pestañas independientes para no perder la navegación.
* **Canal de Contacto Directo:** Al pulsar sobre el correo electrónico (`contacto@rededuca.com`), se abre el cliente de correo predeterminado del dispositivo listo para enviar una consulta.
* **Enlaces Legales:** Accesos al *Aviso de Privacidad*, *Términos y Condiciones* y políticas de datos conforme a los requerimientos de la especificación funcional (Spec v1).

---

## 🛠️ Stack Tecnológico

* **Framework:** Next.js (App Router, Turbopack)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS
* **Iconografía:** Lucide React
* **Gestión de Entorno:** Node.js v20 (definido en `.nvmrc`)
* **Despliegue Continuo:** Vercel

---

## 💻 Guía de Instalación y Ejecución en Local

Para clonar, instalar dependencias y levantar el proyecto en un entorno local:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/HernanJairo/impulso_rededuca_landing.git](https://github.com/HernanJairo/impulso_rededuca_landing.git)
cd impulso_rededuca_landing
```

### 2. Sincronizar la rama de trabajo
```bash
git checkout staging
git pull origin staging
```

### 3. Instalar las dependencias
Asegúrese de contar con Node.js v20 activo y ejecute:
```bash
npm install
```

### 4. Iniciar el entorno de desarrollo local
```bash
npm run dev
```

Abra su navegador web en la dirección local provista por la consola:  
👉 `http://localhost:3000`

### 5. Compilar y probar la versión de producción (Opcional para auditoría)
Para validar que el build de producción no contenga errores de tipado en TypeScript ni fallos en assets:
```bash
npm run build
npm run start
```

---

## 🧪 Guía de Validación y Pruebas (QA / Testing)

Pasos recomendados para los equipos de Testing y Auditoría:

1. **Prueba de Enlaces y Navegación Interna:**
   - Probar que cada enlace del Navbar y del Footer traslade al usuario a su sección respectiva (`#inicio`, `#problema`, `#propuesta`, `#comunidad`, `#funcionamiento`, `#privacidad`, `#contacto`).
   - Verificar que el enlace de correo abra el protocolo `mailto:` con la dirección oficial.
   - Comprobar que los enlaces a redes sociales abran en una pestaña nueva con `rel="noopener noreferrer"`.
2. **Prueba de Comportamiento Móvil y Responsive:**
   - Activar el modo responsive del navegador (`F12` ➔ Modo dispositivo).
   - Probar resoluciones de 375px (iPhone SE/Mini) y 412px (Android estándar).
   - Verificar que las imágenes carguen sus variantes móviles optimizadas (`hero-mobile.webp` y `problem-mobile.webp`).
   - Validar que ningún contenedor genere scroll horizontal involuntario.
   - Probar la apertura y cierre del menú hamburguesa, comprobando que bloquee el scroll del fondo mientras permanezca abierto y se cierre al hacer clic en un enlace.
3. **Prueba de Acordeón en "El Problema":**
   - Abrir y cerrar cada una de las 3 tarjetas de problemas (*Información dispersa*, *Comunicación fragmentada*, *Tareas administrativas repetitivas*) de forma consecutiva.
   - Comprobar que la animación de despliegue sea suave y que los estados no queden congelados.
4. **Verificación de Consola y Rendimiento:**
   - Abrir la pestaña *Console* de las herramientas de desarrollador y constatar que no existan errores 404 en imágenes, fuentes o scripts.
   - Verificar que no existan avisos de hidratación entre el renderizado del servidor y el cliente.

---

## 🌿 Flujo de Trabajo y Gestión de Ramas (Git Workflow)

1. **`main` (Producción):** Rama base estable vinculada al despliegue productivo en Vercel.
2. **`staging` (Pruebas e Integración):** Rama común donde convergen todas las funcionalidades validadas antes de pasar a producción.
3. **Feature Branches (`feat/*`):** Toda tarea nace a partir de una versión actualizada de `staging`.
4. **Pull Requests y Code Review:** Para mergear hacia `staging` se requiere abrir un Pull Request con descripción de cambios, adjuntar evidencias visuales y contar con la aprobación (*Approve*) de revisión cruzada entre los desarrolladores del equipo.