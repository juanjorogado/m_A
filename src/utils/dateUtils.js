const getMeditationForDate = (date) => {
  const dateKey = date.toISOString().slice(0, 10);
  
  // Primero buscar coincidencia exacta
  const exactMatch = MEDITATIONS.find(med => med.id === dateKey);
  if (exactMatch) return exactMatch;
  
  // Si no hay coincidencia exacta, buscar por número de día del año
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (24 * 60 * 60 * 1000));
  const meditationsForYear = MEDITATIONS.filter(med => 
    med.id.startsWith(`${date.getFullYear()}-`)
  );
  
  if (meditationsForYear.length > 0) {
    const index = dayOfYear % meditationsForYear.length;
    return meditationsForYear[index];
  }
  
  // Fallback a la primera meditación disponible
  return MEDITATIONS[0];
};

export { getMeditationForDate };