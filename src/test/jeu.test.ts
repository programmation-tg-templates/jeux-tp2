// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { beforeEach, describe, expect, test } from "vitest";
import type { PlateauPuissance4 } from '../index';
import { creerPlateau, placerJeton } from '../index';

describe('Placement de jetons', () => {
  let plateau: PlateauPuissance4;

  beforeEach(() => {
    plateau = creerPlateau();
  });

  describe('placerJeton', () => {
    test('place un jeton joueur1 dans une colonne vide', () => {
      const result = placerJeton(plateau, 0, "joueur1");
      expect(result).toBe(true);
      // Vérifier que le jeton est à la ligne 5 (bas du plateau)
      const indice = 5 * 7 + 0; // ligne 5, colonne 0
      expect(plateau.cases[indice]).toBe("joueur1");
    });

    test('place un jeton joueur2 dans une colonne vide', () => {
      const result = placerJeton(plateau, 3, "joueur2");
      expect(result).toBe(true);
      const indice = 5 * 7 + 3;
      expect(plateau.cases[indice]).toBe("joueur2");
    });

    test('empile correctement les jetons', () => {
      placerJeton(plateau, 2, "joueur1");
      placerJeton(plateau, 2, "joueur2");
      placerJeton(plateau, 2, "joueur1");

      // Vérifier l'empilement
      expect(plateau.cases[5 * 7 + 2]).toBe("joueur1");
      expect(plateau.cases[4 * 7 + 2]).toBe("joueur2");
      expect(plateau.cases[3 * 7 + 2]).toBe("joueur1");
    });

    test('retourne false si la colonne est pleine', () => {
      for (let i = 0; i < 6; i++) {
        placerJeton(plateau, 5, "joueur1");
      }
      const result = placerJeton(plateau, 5, "joueur2");
      expect(result).toBe(false);
    });

    test('ne modifie pas le plateau si la colonne est pleine', () => {
      for (let i = 0; i < 6; i++) {
        placerJeton(plateau, 6, "joueur1");
      }
      const casesCopy = [...plateau.cases];
      placerJeton(plateau, 6, "joueur2");
      expect(plateau.cases).toEqual(casesCopy);
    });

    test('gère plusieurs colonnes indépendamment', () => {
      placerJeton(plateau, 0, "joueur1");
      placerJeton(plateau, 1, "joueur2");
      placerJeton(plateau, 2, "joueur1");

      expect(plateau.cases[5 * 7 + 0]).toBe("joueur1");
      expect(plateau.cases[5 * 7 + 1]).toBe("joueur2");
      expect(plateau.cases[5 * 7 + 2]).toBe("joueur1");
    });
  });
});
