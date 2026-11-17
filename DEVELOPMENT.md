# Guía de Desarrollo - Neo Trance Stories

## 📋 Estándares de Código

### TypeScript
- ✅ Tipos explícitos en todos los componentes y funciones
- ✅ Interfaces para props de componentes
- ✅ No usar `any` (excepto casos de terceros legacy)
- ✅ Genéricos para hooks reutilizables

### React
- ✅ Componentes funcionales con hooks
- ✅ `useCallback` para optimizar re-renders
- ✅ `useMemo` para cálculos costosos (ej: análisis de audio)
- ✅ `useRef` para referencias a elementos DOM persistentes
- ✅ Naming: PascalCase para componentes, camelCase para funciones

### Estilos
- ✅ Tailwind CSS para utility classes
- ✅ Tailwind Arbitrary Values para colores custom neon
- ✅ CSS personalizado solo para animaciones y efectos complejos
- ✅ Colores centralizados: `#00FF41`, `#DFFF00`, `#1A1A1A`

### Estructura de Carpetas
```
src/
├── components/     # Componentes reutilizables por dominio
├── hooks/          # Custom hooks
├── pages/          # Componentes de página (level superior)
├── styles/         # CSS global
├── types/          # Tipos TypeScript compartidos
└── integrations/   # Conexiones externas (Supabase, etc)
```

## 🎨 Convenciones de Diseño

### Colores
- **Texto principal**: `text-[#00FF41]` → Verde neón
- **Texto secundario**: `text-[#DFFF00]` → Amarillo neón
- **Fondo**: `bg-[#1A1A1A]` → Negro profundo
- **Fondo secundario**: `bg-[#0D0D0D]` → Negro más oscuro

### Efectos Neon
```css
box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
/* Para hover */
box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
```

### Tipografía
- **Font**: `font-mono` (monospace) en todo el portafolio
- **Tracking**: `tracking-widest` para textos de comando
- **Tamaño**: `text-xs` para terminal feel

### Bordes
- Siempre `border border-[#00FF41]`
- Sin `border-radius` (brutalismo)
- Grosor 1px

## 🎵 Web Audio API

### Inicialización
1. Crear `AudioContext` al primer interacción del usuario
2. Crear `AnalyserNode` conectado a `destination`
3. Usar `fftSize = 256` para análisis básico / `2048` para waveform
4. Leer `frequencyBinCount` para buffer size

### Conexión de Audio
```
MediaElementAudioSource
  → Analyser
  → Effects (BiquadFilterNode, etc)
  → Destination (speakers)
```

### Lectura de Frecuencias
```typescript
analyser.getByteFrequencyData(dataArray);
// Rango: 0-255 por bin
// Bajos: bins 0-5
// Medios: bins 5-50
// Altos: bins 50+
```

## 🪟 Sistema de Ventanas

### Estado de Window
```typescript
interface WindowState {
  id: string;              // Único
  title: string;           // Mostrado en header
  x, y: number;           // Posición absoluta
  width, height: number;  // Dimensiones
  zIndex: number;         // Profundidad
  isMinimized: boolean;   // Oculto
  contentType: ...        // Tipo de contenido
}
```

### Drag & Drop
1. `onMouseDown` en header → `startDrag()`
2. `onMouseMove` global → `updateDrag()`
3. `onMouseUp` global → `endDrag()`
4. Mantener `dragState` Map por window

### Z-Index Management
- Incrementar contador global cada vez que ventana se enfoca
- Garantiza orden correcto sin conflictos

## 📊 Canvas Optimization

### Matrix Background
- **RAF loop**: `requestAnimationFrame` para 60fps
- **Clearing**: Llenar con fondo + overlay semi-transparent (trailing effect)
- **Pooling**: Reutilizar `Uint8Array` del analyser
- **Throttling**: No es necesario; Canvas es O(1) aprox

### Waveform Visualizer
- **FFT Size 2048**: Mejor resolución visual
- **RAF loop**: Solo mientras está playing
- **Line rendering**: Eficiente con `lineTo()` continuo

## 🧪 Testing

### Cobertura Recomendada
- Hooks: `useAudioContext`, `useWindowManager`, `useMatrixBackground`
- Componentes: `DraggableWindow`, `Taskbar`, `TrackPlayer`

### Archivo de Setup
Usar `vitest.config.ts` y `test/setup.ts`

## 🚀 Performance Checklist

- [ ] Audio context inicializa solo con interacción
- [ ] Canvas no renderiza cuando ventana minimizada
- [ ] `useCallback` en handlers frecuentes
- [ ] `useMemo` en cálculos de frecuencias
- [ ] Limpiar listeners en `useEffect` cleanup
- [ ] Cancelar `requestAnimationFrame` al desmontar

## 🔐 Seguridad

- Validar URLs de tracks (CORS-safe)
- Sanitizar entrada de usuario (aunque mínima aquí)
- No hardcodear secrets en cliente (ya correctamente separado en Supabase)

## 📦 Dependencias Críticas

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "tailwindcss": "^3.4.17",
  "lucide-react": "^0.462.0"
}
```

No agregar peso innecesario. Web Audio API es nativa.

## 🎯 Checklist para Nueva Funcionalidad

- [ ] Tipos TypeScript definidos en `types/index.ts`
- [ ] Componente en carpeta con nombre descriptivo
- [ ] Props con interfaz explícita
- [ ] Comentarios solo para lógica compleja
- [ ] Compilación sin errores: `npm run build`
- [ ] Consistencia de colores y estilos
- [ ] Respeta convención de naming
- [ ] Hooks custom si lógica es reutilizable

