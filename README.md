# Cuaderno Digital

App web personal de productividad. Cinco secciones, todo persistido en el
navegador (localStorage) — sin backend, sin login.

- 📚 **Libros**: agregar libro (título/autor) y cambiar su estado
  (pendiente → leyendo → leído) con un click.
- 🎵 **Música / Playlist**: canciones con artista y mood/etiqueta libre.
- 💡 **Ideas de productividad**: notas cortas con categoría opcional,
  marcables como nueva → en progreso → implementada.
- 💪 **Hábitos de salud y gym**: marcar "hecho hoy" y ver la racha de días
  seguidos (se corta si se salta un día).
- 📝 **Notas y estudio**: notas con fecha automática y etiqueta libre,
  con buscador por texto o etiqueta.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción
```

Stack: React + Vite + TypeScript + Tailwind CSS v4. Todos los datos se
guardan automáticamente en `localStorage` del navegador.
