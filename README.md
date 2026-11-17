# Neo Trance Stories - Portafolio Interactivo DJ/Productor

## 🎛️ Descripción General

**Neo Trance Stories** es un portafolio interactivo inspirado en la estética cyberpunk y brutalista de plataformas como **Poolsuite.net**, **The Matrix** y **Resident Advisor**. 

La aplicación está diseñada como un **desktop/consola interactiva** (zero-scroll) que reacciona en tiempo real a la música, combinando:

- 🎨 **Canvas Matrix Audio-Reactivo**: Lluvia de caracteres katakana y binarios que reaccionan a las bajas frecuencias
- 🪟 **Sistema de Ventanas Flotantes**: Estilo SO retro con menú terminal arrastrables
- 🎵 **Reproductor de Audio**: Con visualizador de waveform y 4 botones FX
- 🎚️ **Web Audio API**: Integración profunda con análisis de frecuencias en tiempo real

---

## 🏗️ Estructura de Carpetas

```
src/
├── components/
│   ├── audio-reactive/
│   │   ├── MatrixBackground.tsx      # Canvas con lluvia Matrix
│   │   └── WaveformVisualizer.tsx    # Visualizador de forma de onda
│   ├── player/
│   │   ├── TrackPlayer.tsx           # Reproductor principal
│   │   └── FxPad.tsx                 # 4 botones de efectos
│   └── window-system/
│       ├── DraggableWindow.tsx       # Ventana individual draggable
│       ├── WindowManager.tsx         # Gestor de ventanas
│       └── Taskbar.tsx               # Barra de tareas con comandos
├── hooks/
│   ├── useAudioContext.ts            # Inicialización Web Audio API
│   ├── useWindowManager.ts           # Gestor de estado de ventanas
│   └── useMatrixBackground.ts        # Lógica del canvas Matrix
├── pages/
│   └── InteractivePortfolio.tsx      # Página principal
├── styles/
│   └── cyberpunk.css                 # Estilos brutalistas y animaciones
└── types/
    └── index.ts                      # Tipos TypeScript globales
```

---

## 🎮 Características Principales

### 1. **Viewport Fijo (Zero Scroll)**
- Ocupación completa de `100vw × 100vh`
- Comportamiento como consola/escritorio interactivo
- Ningún scroll vertical

### 2. **Fondo Matrix Audio-Reactivo**
```typescript
// Componente MatrixBackground
// - Lluvia de caracteres: 01ｦｧｨｩｪｫｬｭｮｯﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ
// - Colores: Verde Neón (#00FF41) y Amarillo Neón (#DFFF00)
// - Fondo: Negro oscuro (#1A1A1A)
// - Reacción: Velocidad y brillo controlados por bajas frecuencias
```

**Detalles técnicos:**
- Usa `AnalyserNode` de Web Audio API
- Monitorea frecuencias bajas (0-5 bins = bajos/kicks)
- Alterna colores según intensidad del bajo
- Efecto de desvanecimiento (trailing) para movimiento fluido

### 3. **Sistema de Ventanas Flotantes**

**Taskbar (Barra inferior):**
```
[ REPRODUCTOR_TRACKS ] [ BIO_&_MANIFIESTO ] [ SETS_EN_VIVO ] [ CONTACTO ]
```

**Características:**
- Ventanas draggables por header
- Botones de minimizar y cerrar
- Z-index automático (trae al frente al hacer clic)
- Bordes de 1px sin border-radius (brutalista)
- Efecto glow neon: `box-shadow: 0 0 20px rgba(0, 255, 65, 0.3)`

### 4. **Reproductor de Tracks**

**Componentes:**
- Información del track (título y artista)
- Visualizador de waveform en tiempo real
- Controles: Play, Pause, Siguiente, Anterior
- Control de volumen
- **FX Pad** con 4 botones:
  - 🔊 **BASS+**: Boost de bajos con LowShelf filter
  - 📡 **FILTER**: HighPass automático con sweep
  - 🎚️ **REVERB**: Delay simulado con wet/dry mix
  - ⚡ **GLITCH**: Efecto de ducking rítmico

**Playlist integrada:**
- Visualización de tracks disponibles
- Cambio rápido por clic
- Indicador visual del track actual

---

## 🚀 Cómo Usar

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

### Acceder al Portafolio

```
http://localhost:5173/portfolio
```

---

## 🎨 Paleta de Colores

| Uso | Color | Código |
|-----|-------|--------|
| Texto Principal | Verde Neón | `#00FF41` |
| Texto Secundario | Amarillo Neón | `#DFFF00` |
| Fondo | Negro Oscuro | `#1A1A1A` |
| Fondo Secundario | Negro Más Oscuro | `#0D0D0D` |

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Estilado**: Tailwind CSS 3 + CSS personalizado
- **Audio**: Web Audio API (AnalyserNode, BiquadFilterNode)
- **Canvas**: HTML5 Canvas API
- **Componentes**: Lucide React Icons
- **UI Base**: shadcn/ui

---

## 📱 Personalización

### Agregar Tracks

En `src/components/player/TrackPlayer.tsx`, edita el array `DEMO_TRACKS`:

```typescript
const DEMO_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Tu Track 1',
    artist: 'Tu Nombre',
    url: 'https://ejemplo.com/track1.mp3',
  },
  // Más tracks...
];
```

### Cambiar Información de Bio/Contacto

- **Bio**: `src/pages/InteractivePortfolio.tsx` → `BioContent`
- **Sets**: `src/pages/InteractivePortfolio.tsx` → `SetsContent`
- **Contacto**: `src/pages/InteractivePortfolio.tsx` → `ContactContent`

### Personalizar Efectos FX

En `src/components/player/FxPad.tsx`, modifica la función `triggerFx()` para agregar más filtros de Web Audio API.

---

## 🔧 Hooks Reutilizables

### `useAudioContext()`
Inicializa y gestiona el contexto de audio global.

```typescript
const { audioContext, analyser, getFrequencyData, getBassFrequency } = useAudioContext();
```

### `useWindowManager()`
Gestiona el estado de ventanas (crear, cerrar, arrastrar, enfocar).

```typescript
const { windows, createWindow, closeWindow, startDrag, updateDrag, endDrag } = useWindowManager();
```

### `useMatrixBackground()`
Renderiza la lluvia Matrix conectada a frecuencias de audio.

```typescript
useMatrixBackground(canvasRef, bassFrequency);
```

---

## 🎯 Próximos Pasos Sugeridos

1. **Integración de Tracks Reales**
   - Conectar con SoundCloud API o Spotify
   - Cargar URLs de tus producciones

2. **Galería de Sets Grabados**
   - Componente con reproductor de video/audio
   - Timestamps y tracklists

3. **Visualizaciones Avanzadas**
   - Espectrograma 3D con Three.js
   - Efectos de partículas sincronizadas

4. **Almacenamiento de Estado**
   - Guardar posiciones de ventanas en localStorage
   - Preferencias de usuario (volumen, tema)

5. **Responsive Design (Opcional)**
   - Versión mobile con layout adaptado
   - Touch support para arrastrar ventanas

---

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de modificarlo y distribuirlo bajo tus términos.

---

## 🎵 Créditos

Inspiración artística: Poolsuite.net, Resident Advisor, The Matrix
Stack: React, Vite, Web Audio API, Tailwind CSS


