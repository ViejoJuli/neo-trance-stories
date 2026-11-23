# Roadmap de producto — Neo Trance Stories

**Fecha:** 23 de noviembre de 2026  
**Estado:** propuesta para validar con el artista  
**Referencia:** [PRD](./PRD.md)

## Visión

Un lugar de encuentro donde la música, las reflexiones y la fotografía de -1
ayuden a las personas a conectar, encontrar inspiración y compartir historias.
La experiencia combina una estética Matrix, neón y espiritual con un mensaje
humano de esperanza y motivación.

La prioridad es construir primero una **comunidad pequeña y viva**, no una red
social grande. La tecnología debe apoyar esa conexión, no reemplazarla.

Los tiempos son orientativos, suponiendo una persona desarrolladora y contenido
disponible; se ajustarán según disponibilidad, validación y alcance. No son fechas
de lanzamiento comprometidas.

## Punto de partida

- Existen la portada Matrix, la radio persistente, el perfil de TikTok y la base
  del muro fotográfico.
- Supabase respondió en las pruebas locales anteriores. El registro con Google
  necesita configuración y una prueba completa.
- Todavía no hay un espacio de conversación comunitaria; el muro no contiene
  fotografías del artista ni tiene un panel de carga.
- La radio continúa al navegar dentro de la aplicación, pero no al recargar o
  abandonar el sitio. El audio de SoundCloud no está conectado a un analizador
  de frecuencias.

## Fase 1 · Preparar el universo para recibir personas

**Semanas 1–3 · Prioridad máxima**

- Publicar la página con dominio propio y conexión segura.
- Configurar y probar registro, Google, recuperación de cuenta y cierre de sesión.
- Revisar textos, testimonios y contenido de ejemplo para que todo represente la
  historia real del artista.
- Mejorar la radio: controles claros, selección de sets y alternativa cuando el
  navegador bloquee el sonido automático.
- Revisar móvil, accesibilidad, privacidad y funcionamiento con internet lento.

**Resultado esperado:** poder invitar a personas reales con confianza.

## Fase 2 · Darle alma al contenido

**Semanas 3–6**

### Muro «Fragmentos de la ciudad»

Se propone una **constelación de miradas**, más que una copia de Pinterest:

- Las fotos forman un collage de distintos tamaños.
- Cada imagen puede abrir una historia corta sobre lo que el artista vio, sintió
  o recordó.
- Algunas fotografías se relacionan con un set o reflexión, formando pequeños
  recorridos temáticos como esperanza, cambio o ciudad nocturna.
- Un panel sencillo permite publicar fotos, título, descripción y texto
  alternativo sin editar código.

Estas conexiones y el panel son propuestas, no funciones ya implementadas. La
publicación depende de contar con fotografías y derechos de uso.

### Reflexiones y música

- Seleccionar videos concretos de TikTok y acompañarlos con una breve idea
  escrita. La integración actual muestra videos recientes elegidos por TikTok,
  no una selección editorial.
- Crear páginas para sets con su historia y enlaces relacionados.
- Preparar la página del próximo disco cuando se confirmen nombre, narrativa y
  fecha o condición de anuncio.

**Resultado esperado:** descubrir no solo la música, sino la manera de ver el
mundo del artista.

## Fase 3 · Primera comunidad

**Semanas 6–10**

Empezar con una función sencilla: **«Una pregunta, muchas miradas»**.

El artista publica una pregunta asociada a una canción, fotografía o reflexión;
las personas registradas pueden responder y leer otras respuestas. Por ejemplo:
«¿Qué te ha ayudado a volver a empezar?».

Antes de abrirla:

- Definir normas, reportes, moderación y eliminación de contenido.
- Decidir quién puede publicar y quién modera.
- Diseñar privacidad y consentimiento; no presentar el espacio como terapia ni
  solicitar información sensible.
- Añadir notificaciones solo si aportan valor y la persona las acepta.

**Resultado esperado:** una primera conversación real, fácil de cuidar y evaluar.

## Fase 4 · Motivos para volver

**Semanas 10–14, si la comunidad inicial participa**

- Un espacio personal con favoritos de música, fotos y reflexiones.
- Recorridos seleccionados: **escuchar → mirar → reflexionar → conversar**.
- Novedades por correo solo con suscripción y consentimiento, cuando exista una
  frecuencia sostenible.
- Opción en inglés para las partes principales del sitio.

**Resultado esperado:** encontrar algo nuevo y una razón auténtica para regresar.

## Fase 5 · Experimentos de vanguardia

**Después de validar lo anterior; sin fechas comprometidas**

- **Transiciones inmersivas:** pasar de una fotografía a su historia como si se
  atravesaran capas de la Matrix, con alternativa sin movimiento.
- **Experiencias por lanzamiento:** conectar portada, música, fotos y relatos
  del disco en un recorrido editorial.
- **PWA instalable:** evaluar la instalación en pantalla de inicio si se
  comprueba que las personas regresan.
- **IA como herramienta interna, no como protagonista:** ayudar a organizar
  contenido o proponer textos alternativos, siempre con revisión del artista.
- Monetización o tienda solo después de comprobar interés y tener una operación real.

## Cómo sabremos si funciona

Primero establecer una **línea base**, sin inventar metas. Medir únicamente con
consentimiento y una política de privacidad adecuada.

| Pregunta | Señal propuesta |
| --- | --- |
| ¿Conecta la música? | Personas que inician una reproducción, no solo quienes cargan el reproductor. |
| ¿Interesan las historias? | Visitas a reflexiones y fotografías con historia. |
| ¿Nace comunidad? | Personas que participan y regresan en los siguientes 30 días. |
| ¿La experiencia es cómoda? | Problemas reportados en móvil, accesibilidad y velocidad. |

Complementar los datos con conversaciones breves: qué sintieron las primeras
personas, qué entendieron y por qué volverían. Definir metas tras recopilar la
línea base y decidir qué eventos pueden medirse de manera fiable.

## Criterios tecnológicos

- **Web inmersiva, pero accesible:** animación progresiva, opción de reducir
  movimiento y contenido legible sin efectos.
- **Rendimiento móvil:** vigilar carga, respuesta y estabilidad; optimizar
  imágenes y cargar integraciones externas cuando hagan falta.
- **Compatibilidad antes que novedad:** probar nuevas transiciones con
  alternativas para navegadores que no las soportan.
- **Contenido propio y descubrible:** historias auténticas con texto e imágenes.
  Google indica que no se necesitan optimizaciones especiales para sus funciones
  de IA más allá de las buenas prácticas habituales de búsqueda.
- **Audio honesto:** el widget de SoundCloud ofrece eventos y controles, pero
  eso no implica acceso directo a sus frecuencias para una visualización
  realmente sincronizada.

## Fuentes

- [Web Platform Baseline](https://web.dev/baseline)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [Accesibilidad de animaciones — W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [SoundCloud Widget API](https://developers.soundcloud.com/docs/api/html5-widget)
- [Google Search y funciones de IA](https://developers.google.com/search/docs/appearance/ai-features)

**Siguiente paso recomendado:** cerrar la Fase 1 y, en paralelo, reunir una primera
selección de fotos e historias del artista para construir la constelación.
