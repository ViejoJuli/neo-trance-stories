
-- Seed products
INSERT INTO public.products (nombre, descripcion, precio, stock, categoria, imagen_url, activo) VALUES
('Camiseta "Neo Trance Cafetero"', 'Diseño oversized en algodón premium, color negro con logo -1 bordado en el pecho. Edición limitada para los que vibran con el sonido cafetero.', 45000, 50, 'Ropa', '/placeholder.svg', true),
('Pin Metálico "-1"', 'Pin de metal esmaltado con el logo -1 en acabado dorado sobre negro. Edición limitada para los primeros 100 seguidores.', 15000, 100, 'Accesorios', '/placeholder.svg', true),
('Pack de Stickers Digitales', 'Colección de 12 stickers digitales con diseños exclusivos de Neo Trance Cafetero. Regalo para usuarios registrados.', 0, 999, 'Digital', '/placeholder.svg', true);

-- Seed sets
INSERT INTO public.sets (titulo, url_soundcloud, descripcion, destacado, fecha_publicacion) VALUES
('Neo Trance Cafetero Vol. 1 — El Despertar', 'https://soundcloud.com/elminusuan', 'El primer set oficial de -1. Una hora de bajos profundos, melodías que sanan y ritmos que hacen bailar. Grabado en vivo desde Medellín.', true, '2026-03-15'),
('Melodías que Sanan — Live Session', 'https://soundcloud.com/elminusuan', 'Sesión íntima grabada al amanecer. Sonidos orgánicos mezclados con sintetizadores analógicos para una experiencia de trance profundo.', false, '2026-02-28'),
('Crónicas del Booth — Set #3', 'https://soundcloud.com/elminusuan', 'Tercer set de la serie Crónicas. Hard techno con alma cafetera, grabado en el último evento underground de Bogotá.', false, '2026-01-20');

-- Seed blog posts
INSERT INTO public.blog_posts (titulo, contenido, extracto, categoria, publicado) VALUES
('¿Qué es el Neo Trance Cafetero? El origen de los bajos que sanan.', 
'El Neo Trance Cafetero nace de una necesidad: reconectar la música electrónica con su esencia más profunda. En un mundo donde los festivales se han convertido en escaparates de marcas y los DJs en influencers, decidí volver a las raíces.

Colombia tiene una riqueza sonora increíble. Los ritmos del Pacífico, la cumbia, el vallenato... todos tienen algo en común: cuentan historias. El Neo Trance Cafetero toma esa tradición narrativa y la fusiona con los bajos del techno, las melodías del trance y la energía del hard dance.

No es solo un género musical. Es una filosofía: la música debe sanar, hacer bailar y contar una historia. Todo al mismo tiempo.

Los bajos no son solo frecuencias — son vibraciones que resuenan con tu cuerpo. Cuando un bajo está bien diseñado, no solo lo escuchas: lo sientes en el pecho, en las piernas, en el alma. Eso es lo que busco con cada producción.

El nombre "-1" viene de esa idea de ir un paso atrás, de restar lo innecesario para encontrar lo esencial. Menos ego, menos ruido, más música, más conexión.',
'Descubre el origen del Neo Trance Cafetero: una fusión de tradición colombiana con bajos que sanan y melodías que hacen bailar.',
'Investigación Sonora', true),

('Melodías para bailar y reflexionar: Mi proceso creativo.',
'Cada producción empieza con una pregunta: ¿qué historia quiero contar? No abro el DAW hasta que no tengo clara la emoción que quiero transmitir.

Mi estudio es simple: un par de sintetizadores analógicos, monitores decentes y mucho café colombiano. No necesito más. La tecnología es una herramienta, no el fin.

El proceso creativo del Neo Trance Cafetero tiene tres fases:

1. **La Escucha**: Antes de producir, escucho. Sonidos de la naturaleza, conversaciones en el mercado, el ruido del tráfico en Medellín. Todo es materia prima.

2. **La Alquimia**: Tomo esos sonidos y los transformo. Un vendedor ambulante se convierte en un vocal cortado. El río Cauca se convierte en un pad atmospheric. El café hirviendo se convierte en un hi-hat orgánico.

3. **El Ritual**: La mezcla final es como una ceremonia. Cada elemento tiene su lugar, su momento. No hay prisa. La música se cocina a fuego lento, como un buen café de origen.

El resultado es algo que no suena a nada más. Y eso es exactamente lo que busco.',
'Un vistazo al proceso creativo detrás del Neo Trance Cafetero: de la escucha a la alquimia sonora.',
'Melodías que Sanan', true),

('Crónicas desde el booth: El primer set de la temporada.',
'Bogotá, 3 AM. El warehouse está lleno. No de gente buscando un selfie para Instagram — de gente buscando algo real.

El primer set de la temporada 2026 fue especial. Decidí arriesgar: empecé con 10 minutos de ambient puro. Sin kick, sin bajo. Solo texturas, melodías y el sonido de la lluvia grabada en Manizales.

La gente se quedó quieta. Algunos cerraron los ojos. Otros se miraron confundidos. Pero nadie se fue.

Cuando entró el primer kick a los 10 minutos, la energía explotó. Eso es lo que diferencia al Neo Trance Cafetero de cualquier otro set: la paciencia. No todo tiene que ser inmediato.

Las siguientes dos horas fueron un viaje: desde los 128 BPM del trance melódico hasta los 145 BPM del hard techno, siempre con esa base melódica que te mantiene conectado.

Al final, alguien se acercó al booth y me dijo: "Parce, eso no fue un set. Fue una experiencia." Eso es todo lo que necesito escuchar.

La próxima parada: Medellín. La ciudad que me vio nacer como DJ. Stay tuned.',
'Crónica del primer set de la temporada 2026: ambient, paciencia y hard techno en un warehouse de Bogotá.',
'Diario de Gira', true);
