# 🚀 Inicio Rápido - Neo Trance Stories

## 1. Instalación (Primera vez)

```bash
# Clonar o descargar el repositorio
cd neo-trance-stories

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre **[http://localhost:5173/portfolio](http://localhost:5173/portfolio)**

---

## 2. Vista Rápida de Componentes

### 📍 Ubicación de Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Index.tsx` | Landing page original |
| `/portfolio` | `InteractivePortfolio.tsx` | **TU PORTAFOLIO INTERACTIVO** ⭐ |
| `/auth` | `Auth.tsx` | Autenticación |

---

## 3. Estructura Visual

```
┌─────────────────────────────────────────┐
│          MATRIZ AUDIO-REACTIVO          │
│      (Lluvia de caracteres verdes)      │
│                                         │
│  ┌──────────────┐  ┌──────────────┐    │
│  │ REPRODUCTOR  │  │   BIO &      │    │
│  │   TRACKS     │  │  MANIFIESTO  │    │
│  └──────────────┘  └──────────────┘    │
│                                         │
│  ┌──────────────┐  ┌──────────────┐    │
│  │   SETS EN    │  │  CONTACTO    │    │
│  │    VIVO      │  │              │    │
│  └──────────────┘  └──────────────┘    │
│                                         │
└─────────────────────────────────────────┘
   [ REPRODUCTOR_TRACKS ][ BIO ]...
```

---

## 4. Interacción Básica

### 🖱️ Con el Ratón
1. **Haz clic en botones de la barra**: Se abren nuevas ventanas
2. **Arrastra el header azul**: Mueve la ventana
3. **Botones X y -**: Cierran/minimizan
4. **Play/Pause**: Inicia audio (y efecto Matrix reacciona)
5. **FX Pad**: Presiona botones para efectos de audio (solo mientras suena)

### ⌨️ Recomendaciones
- Haz clic en `REPRODUCTOR_TRACKS`
- Presiona **Play**
- Observa cómo la lluvia Matrix acelera con el audio
- Prueba los botones FX: `BASS+`, `FILTER`, `REVERB`, `GLITCH`

---

## 5. Personalización Rápida

### 📝 Cambiar tu Nombre/Info

**Archivo**: `src/pages/InteractivePortfolio.tsx`

```typescript
// Busca estas secciones:

const BioContent: React.FC = () => (
  <div>
    <p>TU BIOGRAFÍA AQUÍ</p>
  </div>
);

const ContactContent: React.FC = () => (
  <div>
    <div>Email: TU_EMAIL@example.com</div>
    <div>Instagram: @TU_USUARIO</div>
  </div>
);
```

### 🎵 Agregar tus Tracks

**Archivo**: `src/components/player/TrackPlayer.tsx`

```typescript
const DEMO_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Tu Primer Track',
    artist: 'Tu Nombre',
    url: 'https://archivo.mp3',  // URL completa
  },
];
```

---

## 6. Estructura de Hooks

### Hook: `useAudioContext()`
```typescript
// En cualquier componente:
const { audioContext, analyser, getBassFrequency } = useAudioContext();
const bassLevel = getBassFrequency(); // 0-255
```

### Hook: `useWindowManager()`
```typescript
const { windows, createWindow, closeWindow } = useWindowManager();
createWindow('player', 'Mi Reproductor', 600, 400);
```

---

## 7. Colores Neon (Personalización Avanzada)

Los colores están en archivos individuales, aquí están:

| Componente | Color Principal | Ubicación |
|-----------|-----------------|-----------|
| Texto | `#00FF41` Verde | Tailwind: `text-[#00FF41]` |
| Texto Alt | `#DFFF00` Amarillo | Tailwind: `text-[#DFFF00]` |
| Fondo | `#1A1A1A` Negro | Tailwind: `bg-[#1A1A1A]` |

Para cambiar **TODO el color verde a otro**:

1. Buscar-Reemplazar: `#00FF41` → tu nuevo color
2. Compilar: `npm run build`

---

## 8. Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia servidor local

# Build
npm run build            # Compilar producción
npm run build:dev        # Compilar con debug

# Linting
npm run lint             # Verificar código

# Testing
npm run test             # Ejecutar tests una vez
npm run test:watch       # Tests en modo watch

# Preview
npm run preview          # Ver versión compilada localmente
```

---

## 9. Troubleshooting

### ❌ Error: "Audio no funciona"
- Algunos navegadores requieren interacción del usuario primero
- Intenta haciendo clic en el botón **Play**
- Verifica consola: `F12` → `Console`

### ❌ Error: "Ventanas no se arrastran"
- El header debe estar visible
- No hagas drag en botones (X, -)

### ❌ Error: "FX no suenan"
- El audio debe estar sonando (`isPlaying = true`)
- Verifica que el track tenga una URL válida

### ❌ Build falla
```bash
# Limpia caché
rm -rf node_modules .vite dist
npm install
npm run build
```

---

## 10. Próximos Pasos

### Fácil (1-2 horas)
- ✅ Cambiar tu información en BioContent
- ✅ Agregar tus redes sociales en ContactContent
- ✅ Cambiar colores neon a tu gusto

### Intermedio (3-5 horas)
- ✅ Integrar tus tracks reales (URLs de SoundCloud/Bandcamp)
- ✅ Agregar más ventanas (Galería, Blog, etc)
- ✅ Crear efectos de audio adicionales en FxPad

### Avanzado (1-2 días)
- ✅ Integración con API (Spotify, Resident Advisor)
- ✅ Visualizaciones 3D con Three.js
- ✅ Base de datos para sets grabados (Supabase está listo)
- ✅ Sistema de guardado de estado (localStorage)

---

## 11. Recursos Útiles

- 📖 [Web Audio API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- ⚛️ [React Docs](https://react.dev)
- 🔧 [Vite Docs](https://vitejs.dev)

---

## 12. Soporte

¿Problemas? Revisa:
1. `README.md` - Documentación general
2. `DEVELOPMENT.md` - Estándares de código
3. Consola del navegador (F12)
4. Compilar sin errores: `npm run build`

---

**¡A crear tu portafolio interactivo! 🎵✨**

