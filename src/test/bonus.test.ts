// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { creerPlateau, placerJeton, verifierMatchNul } from '../index';
import type { PlateauPuissance4 } from '../index';

describe('Bonus : Match nul', () => {
  let plateau: PlateauPuissance4;

  beforeEach(() => {
    plateau = creerPlateau();
  });

  test('retourne false si plateau vide', () => {
    expect(verifierMatchNul(plateau)).toBe(false);
  });

  test('retourne false si plateau partiellement rempli', () => {
    for (let col = 0; col < 7; col++) {
      for (let i = 0; i < 3; i++) {
        placerJeton(plateau, col, "joueur1");
      }
    }
    expect(verifierMatchNul(plateau)).toBe(false);
  });

  test('retourne true si plateau complètement rempli', () => {
    // Remplir toutes les colonnes
    for (let col = 0; col < 7; col++) {
      for (let ligne = 0; ligne < 6; ligne++) {
        const joueur = (col + ligne) % 2 === 0 ? "joueur1" : "joueur2";
        placerJeton(plateau, col, joueur);
      }
    }
    expect(verifierMatchNul(plateau)).toBe(true);
  });

  test('retourne false si une seule case vide', () => {
    // Remplir presque tout
    for (let col = 0; col < 7; col++) {
      for (let ligne = 0; ligne < 6; ligne++) {
        if (col === 3 && ligne === 0) continue; // Laisser une case vide
        const joueur = (col + ligne) % 2 === 0 ? "joueur1" : "joueur2";
        placerJeton(plateau, col, joueur);
      }
    }
    expect(verifierMatchNul(plateau)).toBe(false);
  });
});
