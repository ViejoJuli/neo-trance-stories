# PRD — Neo Trance Stories

**Estado:** borrador de visión, por validar con el artista  
**Última actualización:** noviembre de 2026  
**Producto:** experiencia digital y comunidad alrededor de -1 y Neo Trance Cafetero

## 1. Visión

Crear un lugar propio de encuentro donde la música, las reflexiones y la
fotografía urbana de -1 conecten una comunidad por historias y un mensaje de
esperanza y motivación. La
experiencia debe sentirse como empezar a ver a través de la Matrix: inmersiva,
humana e interactiva, sin que la estética dificulte escuchar, leer o participar.

No se busca solo promocionar canciones: se busca que las personas quieran volver
por la música, el significado que hay detrás y la posibilidad de conectar con
otras personas. Las funcionalidades propuestas en este documento son hipótesis
de producto, no promesas de funcionalidades ya disponibles.

## 2. Problema y oportunidad

Una canción en una plataforma externa puede llegar a nuevos oyentes, pero no
siempre permite conocer su historia, descubrir el universo del artista o
construir una relación continua con su comunidad. El producto puede conectar
esas piezas en un espacio propio, manteniendo SoundCloud como punto de escucha.

### Personas a las que sirve

- **Oyente nuevo:** quiere descubrir el sonido y entender qué hace diferente al
  artista sin tener que registrarse primero.
- **Seguidor:** quiere volver, conocer las historias detrás de la música y
  participar en la comunidad.
- **Promotor, medio o colaborador:** necesita conocer el proyecto y acceder
  rápidamente al contacto y al presskit.

## 3. Propuesta de valor y principios

1. **Música primero:** escuchar debe ser fácil desde la entrada, también en móvil.
2. **Sentido humano:** las historias, la esperanza y la motivación acompañan la
   estética digital; no se reducen a un efecto visual.
3. **Una experiencia integrada:** portada, música, blog y comunidad comparten
   identidad y navegación; no son productos desconectados.
4. **Participación con confianza:** privacidad, consentimiento, respeto y
   moderación deben formar parte de cualquier función comunitaria.
5. **Accesibilidad y control:** texto legible, navegación con teclado, movimiento
   reducido y control explícito sobre el audio.
6. **Autenticidad:** no presentar testimonios, eventos, beneficios o contenidos
   como reales o disponibles sin verificarlos.

## 4. Estado actual del proyecto

El código incluye:

- Portada con introducción de números, hero, enlaces a música, blog y contacto,
  radio persistente de SoundCloud, reflexiones de TikTok y descarga de presskit. Los
  planes de servicios y sus precios ya no aparecen en la portada.
- El perfil de TikTok se carga mediante la inserción oficial cuando la persona
  lo solicita; también existe un enlace directo. TikTok decide qué videos recientes
  mostrar, por lo que todavía no existe una selección de videos de sabiduría.
- El muro de fotografía tiene un estado inicial vacío y admite fotografías
  configuradas en el código; aún no existe carga desde una interfaz administrativa.
- Solicitud de reproducción automática; el navegador puede bloquearla. El efecto
  visual se mueve de forma independiente y **no** está sincronizado con el audio
  del iframe de SoundCloud.
- La radio se mantiene al navegar internamente y los sets de `/musica` se
  seleccionan en ese reproductor. Una recarga o salida del sitio, incluyendo
  la redirección externa de Google, interrumpe la reproducción.
- Páginas de música y blog que consultan Supabase; cuentas, perfil, favoritos y
  un panel para usuarios. Su funcionamiento depende de la configuración y
  disponibilidad de los servicios externos.
- Una tienda y un prototipo anterior de escritorio interactivo. Su presencia en
  el código no demuestra que compras, comunidad o funciones comerciales estén
  listas para uso real.

Tras restaurar el proyecto, la conexión local a Supabase respondió correctamente:
las consultas públicas a sets, blog y productos y la comprobación de salud de
autenticación devolvieron HTTP 200. La consulta del set también se verificó desde
la aplicación en el navegador. Aún falta probar registro e inicio de sesión reales,
así como la conexión en el entorno de despliegue.

## 5. Experiencia deseada

### Descubrir

Al entrar, una breve cascada numérica abre paso al hero. La persona entiende
quién es -1 y puede escuchar un set o explorar el blog. La entrada no debe
bloquear la navegación y debe respetar la preferencia de movimiento reducido.
El reproductor intenta iniciar automáticamente, pero ofrece control manual si
el navegador lo impide.

### Conectar con el mensaje

El blog y futuras páginas de lanzamientos relacionan música, proceso creativo y
las historias de esperanza y motivación que el artista decida compartir.
El tono debe ser cercano y auténtico, evitando promesas exageradas.
Las reflexiones en TikTok son una entrada adicional a esa conversación, sin
obligar a cargar TikTok al abrir el sitio.

### Mirar la ciudad: «Fragmentos de la ciudad»

Se propone un collage editorial distinto a un tablero genérico: fotografías de
distintos formatos acompañadas por una frase breve del artista sobre lo que vio o
sintió. En una etapa futura podrían organizarse en recorridos por emoción o
conectarse con un set o reflexión, formando constelaciones de historias; esto es
una hipótesis por validar, no una función existente.

La primera versión muestra solo fotografías autorizadas con descripción
alternativa, título e historia opcional. Si no existen obras publicadas, presenta
un estado vacío; no inventa imágenes ni testimonios. Los visitantes podrán
recorrerlo en móvil y teclado. La subida y edición desde un panel, la ampliación
de fotos y las conexiones con música quedan como trabajo posterior.

### Volver y participar

El registro debe explicar qué recibe la persona y permitirle volver a su música
favorita. Se propone explorar una forma de participación comunitaria que aporte
valor real; el formato concreto, las normas y la capacidad de moderación quedan
pendientes de validación.

### Colaborar

El contacto y el presskit deben ser fáciles de encontrar y descargar, tanto en
escritorio como en móvil.

## 6. Próximo disco: propuesta de integración visual

La portada compartida combina amarillo neón, retrato humano y franjas de glitch.
Es una oportunidad para conectar el lenguaje Matrix con una identidad más
personal: detrás del código hay una persona y una historia.

**Propuesta, no implementada ni publicada:**

1. Introducir, cuando el artista lo autorice, un bloque editorial del próximo
   disco dentro de la portada, después del hero, con la carátula completa,
   nombre, breve historia y un único llamado a la acción adecuado a su estado.
2. Reutilizar el amarillo, las franjas de interferencia y el contraste entre
   rostro y código como acentos visuales en esa sección y, de forma contenida,
   en la transición de entrada. Mantener el retrato reconocible y el texto legible.
3. Conectar el bloque con una página o entrada del blog para contar el significado
   del disco. Si aún no hay lanzamiento público, no inventar fecha, enlaces ni
   disponibilidad.
4. Usar alternativas estáticas para movimiento reducido, texto alternativo para
   la portada y recortes adaptados a móvil sin modificar el original.

Antes de publicar: confirmar título, fecha o condición de anuncio, texto,
enlace de escucha y autorización para utilizar la imagen. La portada compartida
no se ha incorporado a los archivos públicos del sitio.

## 7. Alcance y prioridades propuestas

### P0 — Base de la experiencia

- Mantener una sola entrada integrada, responsive y accesible.
- Reproducción SoundCloud con alternativa manual y set alternativo si falla la
  consulta del destacado; registrar el error técnico sin mostrarlo al visitante.
- Validar Supabase, registro, blog, catálogo y descarga del presskit en el entorno
  real. Revisar textos y funcionalidades que prometen beneficios aún no verificados.
- Definir el contenido editorial inicial y cómo se anunciará el próximo disco.
- Incorporar el perfil oficial de TikTok sin requerir credenciales y preparar el
  muro para publicar fotografías reales cuando el artista las comparta.

### P1 — Relación y retorno

- Diseñar una bienvenida que explique el valor de registrarse y qué datos se
  solicitan. Asegurar acceso a perfil y favoritos sin perder la escucha pública.
- Publicar historias relacionadas con la música y establecer una cadencia
  sostenible; no prometer un boletín hasta tener contenido y envío configurados.
- Explorar un primer mecanismo comunitario pequeño, con reglas, moderación y
  vías para reportar o retirar contenido antes de permitir publicaciones abiertas.
- Seleccionar reflexiones específicas y definir una forma sostenible de editar el
  muro de fotografías; evaluar las constelaciones de historias con usuarios reales.

### P2 — Evolución

- Evaluar inglés como opción adicional al español, manteniendo una experiencia
  coherente en ambos idiomas.
- Evaluar experiencias especiales alrededor de lanzamientos, eventos o contenido
  exclusivo según interés real y capacidad del artista.
- Evaluar monetización o tienda únicamente tras validar la propuesta y contar
  con pagos, condiciones y operación verificables.

Estas prioridades son una propuesta de secuencia, sin fechas ni compromisos
comerciales aprobados.

## 8. Requisitos y criterios de aceptación

| Área | Criterio |
| --- | --- |
| Entrada | En condiciones normales aparece la cascada y luego el hero; con movimiento reducido se omite la transición y se mantiene el contenido accesible. |
| Escucha | Una radio persistente permite seleccionar sets y navegar dentro del sitio sin reiniciar el reproductor. Si no se obtiene el set destacado se usa el alternativo sin el aviso técnico. No se garantiza autoplay audible en todos los navegadores ni continuidad tras una recarga o redirección externa. |
| Navegación | Música, blog, contacto y presskit se encuentran desde la experiencia integrada; `/portfolio` lleva al inicio. |
| Responsive | En anchos de 320 px y superiores no hay desbordamiento horizontal en la portada; controles y texto siguen siendo utilizables. |
| Accesibilidad | Los controles tienen nombre accesible, funcionan con teclado y mantienen foco visible; el contenido esencial no depende de animaciones ni de audio. |
| Comunidad futura | Antes de lanzar contenido generado por usuarios se definen moderación, reporte, privacidad y tratamiento de abusos. |
| TikTok | Se ofrece el perfil y la inserción oficial bajo petición, con enlace directo si la inserción falla o no está disponible. TikTok puede mostrar sus videos más recientes, no una selección editorial. |
| Fotografía | El muro presenta obras autorizadas con texto alternativo y una historia opcional; sin fotografías, muestra un estado vacío. La configuración actual no es un sistema de carga de archivos. |
| Disco | No se publica la carátula ni se anuncian datos de lanzamiento sin aprobación del artista. |

## 9. Medición propuesta

Establecer una línea base antes de fijar metas numéricas. Instrumentar únicamente
con consentimiento y una política de privacidad adecuada:

- **Escucha:** proporción de visitantes que inician reproducción, si la API y el
  consentimiento permiten medirla. Un iframe cargado no equivale a una escucha.
- **Conexión:** proporción de visitantes que abren una historia o publicación.
- **Comunidad:** registros completados y personas registradas que vuelven y
  realizan una acción significativa en los siguientes 30 días.
- **Reflexiones y fotografía:** aperturas voluntarias del perfil y vistas de
  historias fotográficas, si se dispone de instrumentación y consentimiento.
- **Colaboración:** descargas del presskit y contactos recibidos, sin considerar
  una descarga como una colaboración confirmada.

Definir eventos, periodos, deduplicación, exclusión de tráfico interno y metas
después de validar la instrumentación y la línea base.

## 10. Riesgos y decisiones pendientes

- **Servicios externos:** SoundCloud y Supabase pueden fallar o estar limitados;
  probar fallos y ofrecer alternativas sin fingir que se reprodujo audio.
- **Autoplay:** las políticas de los navegadores pueden exigir interacción.
- **Confianza:** revisar los precios, testimonios, fechas y promesas existentes
  antes de publicarlos como hechos.
- **Comunidad:** definir formato inicial, normas, responsables, frecuencia de
  participación y privacidad antes de implementarla.
- **TikTok y fotografía:** seleccionar videos específicos, compartir las
  fotografías y confirmar títulos, descripciones, derechos y cuándo publicarlas.
  La inserción de TikTok depende de la disponibilidad y políticas de esa plataforma.
- **Disco:** confirmar nombre, narrativa, estado público y tratamiento visual.
- **Producto:** acordar qué significa éxito para el artista, qué acción se espera
  de un visitante nuevo y qué beneficios reales tendrá una persona registrada.
- **Idiomas y negocio:** priorizar el alcance de inglés y decidir si la tienda o
  membresías forman parte de una etapa posterior.
