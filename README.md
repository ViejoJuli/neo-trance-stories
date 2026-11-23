# Neo Trance Stories

Portafolio de -1, DJ y productor de Neo Trance Cafetero. La página de inicio reúne
la historia, la comunidad y la música en una sola experiencia. Una breve cascada
de números inspirada en Matrix abre paso a la imagen del hero. `/portfolio`
redirige al inicio.

## Desarrollo

```bash
npm install
npm run dev
npm run build
npm test
```

Abre la dirección local indicada por Vite. El proyecto utiliza React, TypeScript,
Vite, Tailwind CSS y Supabase.

La visión y los requisitos del producto se documentan en [PRD.md](./PRD.md);
las prioridades y etapas propuestas, en [ROADMAP.md](./ROADMAP.md).

## Música y animación

La radio flotante reproduce el set destacado de la tabla `sets` mediante el
reproductor oficial de SoundCloud. Permanece montada al navegar entre páginas:
se puede abrir u ocultar sin detenerla. En `/musica` cada set se selecciona para
escucharlo en la misma radio. Si no hay destacado o falla la consulta, se utiliza
«El 3ero - Neo Trance Cafetero». El reproductor solicita reproducción automática;
si el navegador la bloquea, el visitante puede abrir la radio y pulsar play.
También hay un enlace al perfil de SoundCloud.

La reproducción no puede mantenerse al recargar o abandonar el sitio, ni durante
la redirección externa de autenticación con Google.

La cascada se mueve incluso sin música y respeta la preferencia del sistema de
reducir movimiento. El audio del iframe de SoundCloud no se conecta al analizador
de Web Audio, por lo que la animación del inicio no está sincronizada con el sonido.
La página `/musica` mantiene el catálogo de sets guardados en Supabase.
El presskit descargable se encuentra en la sección de contacto.

La sección de reflexiones permite cargar el perfil oficial de TikTok bajo petición
y conserva un enlace directo si no está disponible. La plataforma decide qué
videos recientes muestra y puede cambiar o restringir la inserción.

El muro de fotografía urbana usa los datos de `src/data/urbanPhotos.ts`. Para
publicar una fotografía, añade el archivo a `public` y un registro con `src`
(ruta pública), `alt`, `title` y opcionalmente `story`. Por ejemplo:

```ts
{ src: "/fotografia/imagen.webp", alt: "Descripción de la escena", title: "Título", story: "Su historia" }
```

Sin registros aparece un estado vacío; aún no hay panel para subir fotografías.

Para cambiar el set alternativo, edita `DEFAULT_SET_URL` en
`src/components/Radio.tsx`. Para cambiar el set destacado, administra los registros
de la tabla `sets` en Supabase.

El antiguo escritorio experimental y sus componentes permanecen en el código como
prototipo, pero no son una experiencia separada para los visitantes.
