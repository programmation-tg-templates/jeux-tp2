// Écrivez votre code dans ce fichier.

// ============================================================================
// Types pour le jeu Puissance 4
// ============================================================================

export type CaseP4 = "vide" | "joueur1" | "joueur2";
export type PlateauPuissance4 = {
  largeur: number;   // 7
  hauteur: number;   // 6
  cases: CaseP4[];   // Tableau 1D
};

// ============================================================================
// Niveau 1 : Structure de base (30-40 min)
// ============================================================================

/**
 * Crée un plateau de Puissance 4 vide (6 lignes × 7 colonnes).
 * @returns PlateauPuissance4 initialisé avec toutes les cases vides
 * @example creerPlateau() // retourne un plateau 6×7 vide
 */
export function creerPlateau(): PlateauPuissance4 {
  throw new Error("À implémenter");
}

/**
 * Trouve la première ligne disponible dans une colonne (gravité).
 * Cherche de bas en haut pour simuler la chute d'un jeton.
 * @param plateau - Plateau de jeu
 * @param colonne - Numéro de colonne (0 à 6)
 * @returns Numéro de ligne libre (0 à 5), ou null si colonne pleine
 * @example obtenirPremiereLigneDispo(plateau, 3) // retourne 5 si colonne vide
 */
export function obtenirPremiereLigneDispo(plateau: PlateauPuissance4, colonne: number): number | null {
  throw new Error("À implémenter");
}

// ============================================================================
// Niveau 2 : Logique de jeu (40-50 min)
// ============================================================================

/**
 * Place un jeton du joueur dans une colonne.
 * @param plateau - Plateau de jeu
 * @param colonne - Numéro de colonne (0 à 6)
 * @param joueur - "joueur1" ou "joueur2"
 * @returns true si le jeton a été placé, false si la colonne est pleine
 */
export function placerJeton(plateau: PlateauPuissance4, colonne: number, joueur: "joueur1" | "joueur2"): boolean {
  throw new Error("À implémenter");
}

/**
 * Vérifie s'il y a 4 jetons alignés horizontalement pour un joueur.
 * @param plateau - Plateau de jeu
 * @param joueur - Type de case à vérifier
 * @returns true si 4 jetons alignés horizontalement, false sinon
 */
export function verifierLigne(plateau: PlateauPuissance4, joueur: CaseP4): boolean {
  throw new Error("À implémenter");
}

// ============================================================================
// Niveau 3 : Détection victoire complexe (40-50 min)
// ============================================================================

/**
 * Vérifie s'il y a 4 jetons alignés verticalement pour un joueur.
 * @param plateau - Plateau de jeu
 * @param joueur - Type de case à vérifier
 * @returns true si 4 jetons alignés verticalement, false sinon
 */
export function verifierColonne(plateau: PlateauPuissance4, joueur: CaseP4): boolean {
  throw new Error("À implémenter");
}

/**
 * Vérifie s'il y a 4 jetons alignés en diagonale pour un joueur.
 * Vérifie les diagonales montantes (/) et descendantes (\).
 * @param plateau - Plateau de jeu
 * @param joueur - Type de case à vérifier
 * @returns true si 4 jetons alignés en diagonale, false sinon
 */
export function verifierDiagonales(plateau: PlateauPuissance4, joueur: CaseP4): boolean {
  throw new Error("À implémenter");
}

// ============================================================================
// Bonus : Match nul (optionnel)
// ============================================================================

/**
 * Vérifie si le plateau est plein (match nul).
 * @param plateau - Plateau de jeu
 * @returns true si toutes les cases sont occupées, false sinon
 */
export function verifierMatchNul(plateau: PlateauPuissance4): boolean {
  throw new Error("À implémenter");
}
