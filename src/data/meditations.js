// src/data/meditations.js

export const MEDITATIONS = [
  {
    id: '2026-05-25',
    number: 180,
    book: 'VII',
    chapter: '—',
    quote:
      'TIENES PODER SOBRE TU MENTE, NO SOBRE LOS ACONTECIMIENTOS EXTERNOS. COMPRENDE ESTO Y ENCONTRARÁS LA FUERZA.',
    latin: 'Τὰ ἐφ’ ἡμῖν',
    source: 'Meditaciones · Libro VII · Meditación 180',
    explanation:
      'Marco Aurelio desarrolla aquí una de las ideas centrales del estoicismo: la diferencia entre aquello que depende de nosotros y aquello que pertenece al mundo exterior. La serenidad nace del dominio de la interpretación, no del control absoluto de la realidad.',
    context:
      'Escrita durante las campañas militares del emperador en el Danubio, esta reflexión aparece en un momento de enorme presión política y personal. La cita no es un ejercicio abstracto de filosofía, sino un mecanismo práctico de resistencia emocional.',
    references: [
      {
        title: 'Meditations, Book VII, 180',
        url: 'https://www.gutenberg.org/files/2680/2680-h/2680-h.htm#link2H_4_0007',
        type: 'primary'
      },
      {
        title: 'The Inner Citadel: The Meditations of Marcus Aurelius',
        author: 'Pierre Hadot',
        url: 'https://press.princeton.edu/books/hardcover/9780691020239/the-inner-citadel',
        type: 'secondary'
      },
      {
        title: 'Stoicism and the Art of Happiness',
        author: 'Donald Robertson',
        url: 'https://doi.org/10.1017/9781316226903',
        type: 'secondary'
      }
    ]
  },
  {
    id: '2026-05-26',
    number: 181,
    book: 'VII',
    chapter: '—',
    quote:
      'LA FELICIDAD DE TU VIDA DEPENDE DE LA CALIDAD DE TUS PENSAMIENTOS.',
    latin: 'De qua re cogitas',
    source: 'Meditaciones · Libro VII · Meditación 181',
    explanation:
      'Esta meditación subraya el estoicismo práctico: nuestra felicidad no depende de circunstancias externas sino de la calidad de nuestros juicios internos. Marco Aurelio nos recuerda que somos responsables de nuestros propios pensamientos y actitudes.',
    context:
      'Escrita en medio de las guerras marcomanas, esta reflexión muestra cómo el emperador aplicaba la filosofía estoica como herramienta de supervivencia mental durante tiempos de conflicto.',
    references: [
      {
        title: 'Meditations, Book VII, 181',
        url: 'https://www.gutenberg.org/files/2680/2680-h/2680-h.htm#link2H_4_0007',
        type: 'primary'
      },
      {
        title: 'How to Think Like a Roman Emperor',
        author: 'Donald Robertson',
        url: 'https://www.st Martinspress.com/9781250278533/how-to-think-like-a-roman-emperor/',
        type: 'secondary'
      }
    ]
  },
  {
    id: '2026-05-27',
    number: 182,
    book: 'VII',
    chapter: '—',
    quote:
      'TODO LO QUE OÍMOS ES UNA OPINIÓN, NO UN HECHO. TODO LO QUE VEMOS ES UNA PERSPECTIVA, NO LA VERDAD.',
    latin: 'Omnia opinio',
    source: 'Meditaciones · Libro VIII · Meditación 6',
    explanation:
      'Esta meditación anticipa el constructivismo epistemológico moderno: Marco Aurelio reconoce que nuestras percepciones están filtradas por nuestras interpretaciones, lo que nos libera del dogmatismo y nos abre a la humildad intelectual.',
    context:
      'Parte de una serie de reflexiones sobre la percepción y el juicio escritas durante sus campañas en Europa del Este, mostrando su evolución hacia una comprensión más sofisticada de la naturaleza del conocimiento.',
    references: [
      {
        title: 'Meditations, Book VIII, 6',
        url: 'https://www.gutenberg.org/files/2680/2680-h/2680-h.htm#link2H_4_0008',
        type: 'primary'
      },
      {
        title: 'Epictetus: A Stoic and Socratic Guide to Life',
        author: 'A.A. Long',
        url: 'https://global.oup.com/academic/product/epictetus-9780198727611',
        type: 'secondary'
      }
    ]
  }
  // More meditations can be added following this pattern
];

// Helper function to get meditation for a specific date
export const getMeditationForDate = (date) => {
  const dateKey = date.toISOString().slice(0, 10);
  
  // First try to find exact match
  const exactMatch = MEDITATIONS.find(med => med.id === dateKey);
  if (exactMatch) return exactMatch;
  
  // If no exact match, find meditations for the same year
  const year = date.getFullYear();
  const yearMeditations = MEDITATIONS.filter(med => 
    med.id.startsWith(`${year}-`)
  );
  
  if (yearMeditations.length > 0) {
    // Calculate day of year (0-364)
    const startOfYear = new Date(year, 0, 0);
    const dayOfYear = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    
    // Use modulo to cycle through available meditations for the year
    const index = dayOfYear % yearMeditations.length;
    return yearMeditations[index];
  }
  
  // Fallback to first meditation if no meditations for this year
  return MEDITATIONS[0];
};

// Export all meditations for reference
export { MEDITATIONS };