export const eventsCategory: Record<string, number> = {
  "atelier": 3,
  "braderie-brocante": 4,
  "ceremonie": 5,
  "cinema": 6,
  "conference-rencontre": 7,
  "conseil-municipal": 8,
  "danse": 9,
  "developpement-durable": 10,
  "emploi": 11,
  "exposition": 12,
  "fete-festival": 13,
  "formation": 14,
  "lecture": 15,
  "mode": 16,
  "musique": 17,
  "reunion-publique": 18,
  "sante": 19,
  "spectacle": 20,
  "sport": 21,
  "theatre": 22,
  "visite-balade": 23,
  "aucune": 28,
}

export const getCategoryId = (category: string) => {
  return eventsCategory[category] ?? null;
}