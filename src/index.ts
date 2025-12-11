// Écrivez votre code dans ce fichier.

// ============================================================================
// Types pour le jeu Puissance 4
// ============================================================================

export type JoueurP4 = "joueur1" | "joueur2";
export type CaseP4 = JoueurP4 | "vide";
export type PlateauPuissance4 = {
  largeur: number; // 7
  hauteur: number; // 6
  cases: CaseP4[]; // Tableau 1D
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
  return {
    largeur: 7,
    hauteur: 6,
    cases: new Array(6 * 7).fill("vide"),
  };
}

function obtenirIndice(
  plateau: PlateauPuissance4,
  ligne: number,
  colonne: number,
): number {
  return ligne * plateau.largeur + colonne;
}

/**
 * Trouve la première ligne disponible dans une colonne (gravité).
 * Cherche de bas en haut pour simuler la chute d'un jeton.
 * @param plateau - Plateau de jeu
 * @param colonne - Numéro de colonne (0 à 6)
 * @returns Numéro de ligne libre (0 à 5), ou null si colonne pleine
 * @example obtenirPremiereLigneDispo(plateau, 3) // retourne 5 si colonne vide
 */
export function obtenirPremiereLigneDispo(
  plateau: PlateauPuissance4,
  colonne: number,
): number | null {
  for (let ligne = plateau.hauteur - 1; ligne >= 0; ligne--) {
    const indice = obtenirIndice(plateau, ligne, colonne);
    if (plateau.cases[indice] === "vide") {
      return ligne;
    }
  }
  return null; // Colonne pleine
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
export function placerJeton(
  plateau: PlateauPuissance4,
  colonne: number,
  joueur: JoueurP4,
): boolean {
  const ligne = obtenirPremiereLigneDispo(plateau, colonne);
  if (ligne !== null) {
    const indice = obtenirIndice(plateau, ligne, colonne);
    plateau.cases[indice] = joueur;
    return true;
  } else {
    return false; // Colonne pleine
  }
}

/**
 * Vérifie s'il y a 4 jetons alignés horizontalement pour un joueur.
 * @param plateau - Plateau de jeu
 * @param joueur - Type de case à vérifier
 * @returns true si 4 jetons alignés horizontalement, false sinon
 */
export function verifierLigne(
  plateau: PlateauPuissance4,
  joueur: JoueurP4,
): boolean {
  for (let ligne = 0; ligne < plateau.hauteur; ligne++) {
    let compteur = 0;

    for (let colonne = 0; colonne < plateau.largeur; colonne++) {
      const indice = obtenirIndice(plateau, ligne, colonne);
      if (plateau.cases[indice] === joueur) {
        compteur++;
        if (compteur === 4) {
          return true; // Victoire trouvée
        }
      } else {
        compteur = 0; // Réinitialiser le compteur
      }
    }
  }
  return false; // Pas de victoire trouvée
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
export function verifierColonne(
  plateau: PlateauPuissance4,
  joueur: JoueurP4,
): boolean {
  for (let colonne = 0; colonne < plateau.largeur; colonne++) {
    let compteur = 0;

    for (let ligne = 0; ligne < plateau.hauteur; ligne++) {
      const indice = obtenirIndice(plateau, ligne, colonne);
      if (plateau.cases[indice] === joueur) {
        compteur++;
        if (compteur === 4) {
          return true; // Victoire trouvée
        }
      } else {
        compteur = 0; // Réinitialiser le compteur
      }
    }
  }
  return false; // Pas de victoire trouvée
}

type Position = {
  ligne: number;
  colonne: number;
};

function verifierDiagonale(
  plateau: PlateauPuissance4,
  depart: Position,
  joueur: JoueurP4,
  incrementLigne: 1 | -1,
): boolean {
  let compteur = 0;
  let ligne = depart.ligne;
  let colonne = depart.colonne;
  while (
    ligne >= 0 &&
    ligne < plateau.hauteur &&
    colonne >= 0 &&
    colonne < plateau.largeur
  ) {
    const indice = obtenirIndice(plateau, ligne, colonne);
    if (plateau.cases[indice] === joueur) {
      compteur++;
      if (compteur === 4) {
        return true; // Victoire trouvée
      }
    } else {
      compteur = 0; // Réinitialiser le compteur
    }
    ligne += incrementLigne;
    colonne += 1;
  }
  return false; // Pas de victoire trouvée
}

/**
 * Vérifie s'il y a 4 jetons alignés en diagonale pour un joueur.
 * Vérifie les diagonales montantes (/) et descendantes (\).
 * @param plateau - Plateau de jeu
 * @param joueur - Type de case à vérifier
 * @returns true si 4 jetons alignés en diagonale, false sinon
 */
export function verifierDiagonales(
  plateau: PlateauPuissance4,
  joueur: JoueurP4,
): boolean {
  // Diagonales descendantes (\)
  for (let ligne = 0; ligne < plateau.hauteur - 3; ligne++) {
    let depart: Position = { ligne: ligne, colonne: 0 };
    if (verifierDiagonale(plateau, depart, joueur, 1)) {
      return true;
    }
  }
  for (let colonne = 1; colonne < plateau.largeur - 3; colonne++) {
    let depart: Position = { ligne: 0, colonne: colonne };
    if (verifierDiagonale(plateau, depart, joueur, 1)) {
      return true;
    }
  }
  // Diagonales montante (\)
  for (let ligne = 3; ligne < plateau.hauteur; ligne++) {
    let depart: Position = { ligne: ligne, colonne: 0 };
    if (verifierDiagonale(plateau, depart, joueur, -1)) {
      return true;
    }
  }
  for (let colonne = 0; colonne < plateau.largeur - 3; colonne++) {
    let depart: Position = { ligne: plateau.hauteur - 1, colonne: colonne };
    if (verifierDiagonale(plateau, depart, joueur, -1)) {
      return true;
    }
  }
  return false; // Pas de victoire trouvée
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
  return plateau.cases.every((caseP4) => caseP4 !== "vide");
}
