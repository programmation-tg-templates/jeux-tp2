// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { beforeEach, describe, expect, test } from "vitest";
import type { PlateauPuissance4 } from '../index';
import { creerPlateau, obtenirPremiereLigneDispo, placerJeton } from '../index';

describe('Gravité et disponibilité', () => {
  let plateau: PlateauPuissance4;

  beforeEach(() => {
    plateau = creerPlateau();
  });

  describe('obtenirPremiereLigneDispo', () => {
    test('retourne la ligne du bas (5) si colonne vide', () => {
      expect(obtenirPremiereLigneDispo(plateau, 0)).toBe(5);
      expect(obtenirPremiereLigneDispo(plateau, 3)).toBe(5);
      expect(obtenirPremiereLigneDispo(plateau, 6)).toBe(5);
    });

    test('retourne la ligne au-dessus si un jeton déjà placé', () => {
      placerJeton(plateau, 2, "joueur1");
      expect(obtenirPremiereLigneDispo(plateau, 2)).toBe(4);
    });

    test('retourne la bonne ligne avec plusieurs jetons empilés', () => {
      placerJeton(plateau, 3, "joueur1");
      placerJeton(plateau, 3, "joueur2");
      placerJeton(plateau, 3, "joueur1");
      expect(obtenirPremiereLigneDispo(plateau, 3)).toBe(2);
    });

    test('retourne null si la colonne est pleine', () => {
      for (let i = 0; i < 6; i++) {
        placerJeton(plateau, 4, "joueur1");
      }
      expect(obtenirPremiereLigneDispo(plateau, 4)).toBeNull();
    });

    test('gère correctement toutes les colonnes', () => {
      for (let col = 0; col < 7; col++) {
        expect(obtenirPremiereLigneDispo(plateau, col)).toBe(5);
      }
    });
  });
});
