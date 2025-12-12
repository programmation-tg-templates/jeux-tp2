// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { beforeEach, describe, expect, test } from "vitest";
import type { PlateauPuissance4 } from "../index";
import {
  creerPlateau,
  placerJeton,
  verifierColonne,
  verifierDiagonales,
  verifierLigne,
} from "../index";

describe("Détection de victoire", () => {
  let plateau: PlateauPuissance4;

  beforeEach(() => {
    plateau = creerPlateau();
  });

  describe("verifierLigne", () => {
    test("détecte 4 jetons alignés horizontalement", () => {
      // Placer 4 jetons joueur1 horizontalement (ligne 5, colonnes 0-3)
      placerJeton(plateau, 0, "joueur1");
      placerJeton(plateau, 1, "joueur1");
      placerJeton(plateau, 2, "joueur1");
      placerJeton(plateau, 3, "joueur1");

      expect(verifierLigne(plateau, "joueur1")).toBe(true);
    });

    test("retourne false si seulement 3 jetons alignés", () => {
      placerJeton(plateau, 0, "joueur1");
      placerJeton(plateau, 1, "joueur1");
      placerJeton(plateau, 2, "joueur1");

      expect(verifierLigne(plateau, "joueur1")).toBe(false);
    });

    test("retourne false si alignement interrompu", () => {
      placerJeton(plateau, 0, "joueur1");
      placerJeton(plateau, 1, "joueur1");
      placerJeton(plateau, 2, "joueur2"); // Interruption
      placerJeton(plateau, 3, "joueur1");

      expect(verifierLigne(plateau, "joueur1")).toBe(false);
    });

    test("détecte alignement au milieu du plateau", () => {
      // Ligne 5, colonnes 2-5
      placerJeton(plateau, 2, "joueur2");
      placerJeton(plateau, 3, "joueur2");
      placerJeton(plateau, 4, "joueur2");
      placerJeton(plateau, 5, "joueur2");

      expect(verifierLigne(plateau, "joueur2")).toBe(true);
    });

    test("ne détecte pas alignement d'un autre joueur", () => {
      placerJeton(plateau, 0, "joueur1");
      placerJeton(plateau, 1, "joueur1");
      placerJeton(plateau, 2, "joueur1");
      placerJeton(plateau, 3, "joueur1");

      expect(verifierLigne(plateau, "joueur2")).toBe(false);
    });
  });

  describe("verifierColonne", () => {
    test("détecte 4 jetons alignés verticalement", () => {
      // Colonne 3, 4 jetons joueur1
      placerJeton(plateau, 3, "joueur1");
      placerJeton(plateau, 3, "joueur1");
      placerJeton(plateau, 3, "joueur1");
      placerJeton(plateau, 3, "joueur1");

      expect(verifierColonne(plateau, "joueur1")).toBe(true);
    });

    test("retourne false si seulement 3 jetons empilés", () => {
      placerJeton(plateau, 2, "joueur2");
      placerJeton(plateau, 2, "joueur2");
      placerJeton(plateau, 2, "joueur2");

      expect(verifierColonne(plateau, "joueur2")).toBe(false);
    });

    test("retourne false si alignement interrompu", () => {
      placerJeton(plateau, 4, "joueur1");
      placerJeton(plateau, 4, "joueur1");
      placerJeton(plateau, 4, "joueur2"); // Interruption
      placerJeton(plateau, 4, "joueur1");
      placerJeton(plateau, 4, "joueur1");

      expect(verifierColonne(plateau, "joueur1")).toBe(false);
    });

    test("détecte alignement dans différentes colonnes", () => {
      for (let i = 0; i < 4; i++) {
        placerJeton(plateau, 6, "joueur2");
      }

      expect(verifierColonne(plateau, "joueur2")).toBe(true);
    });
  });

  describe("verifierDiagonales", () => {
    test("détecte diagonale montante à partir de la colonne 0 (/)", () => {
      // Diagonale / : (0,5), (1,4), (2,3), (3,2)
      placerJeton(plateau, 0, "joueur1"); // ligne 5

      placerJeton(plateau, 1, "joueur2"); // ligne 5
      placerJeton(plateau, 1, "joueur1"); // ligne 4

      placerJeton(plateau, 2, "joueur2"); // ligne 5
      placerJeton(plateau, 2, "joueur2"); // ligne 4
      placerJeton(plateau, 2, "joueur1"); // ligne 3

      placerJeton(plateau, 3, "joueur2"); // ligne 5
      placerJeton(plateau, 3, "joueur2"); // ligne 4
      placerJeton(plateau, 3, "joueur2"); // ligne 3
      placerJeton(plateau, 3, "joueur1"); // ligne 2

      expect(verifierDiagonales(plateau, "joueur1")).toBe(true);
    });

    test("détecte diagonale montante au milieu du plateau (/)", () => {
      // Diagonale / : (2,5), (3,4), (4,3), (5,2)
      placerJeton(plateau, 2, "joueur1"); // ligne 5

      placerJeton(plateau, 3, "joueur2"); // ligne 5
      placerJeton(plateau, 3, "joueur1"); // ligne 4

      placerJeton(plateau, 4, "joueur2"); // ligne 5
      placerJeton(plateau, 4, "joueur2"); // ligne 4
      placerJeton(plateau, 4, "joueur1"); // ligne 3

      placerJeton(plateau, 5, "joueur2"); // ligne 5
      placerJeton(plateau, 5, "joueur2"); // ligne 4
      placerJeton(plateau, 5, "joueur2"); // ligne 3
      placerJeton(plateau, 5, "joueur1"); // ligne 2

      expect(verifierDiagonales(plateau, "joueur1")).toBe(true);
    });

    test("détecte diagonale descendante en haut du plateau (\\)", () => {
      // Diagonale \ : (4,3), (3,2), (2,1), (1,0)
      placerJeton(plateau, 4, "joueur1"); // ligne 5
      placerJeton(plateau, 4, "joueur1"); // ligne 4
      placerJeton(plateau, 4, "joueur2"); // ligne 3

      placerJeton(plateau, 3, "joueur1"); // ligne 5
      placerJeton(plateau, 3, "joueur1"); // ligne 4
      placerJeton(plateau, 3, "joueur1"); // ligne 3
      placerJeton(plateau, 3, "joueur2"); // ligne 2

      placerJeton(plateau, 2, "joueur1"); // ligne 5
      placerJeton(plateau, 2, "joueur1"); // ligne 4
      placerJeton(plateau, 2, "joueur1"); // ligne 3
      placerJeton(plateau, 2, "joueur1"); // ligne 2
      placerJeton(plateau, 2, "joueur2"); // ligne 1

      placerJeton(plateau, 1, "joueur1"); // ligne 5
      placerJeton(plateau, 1, "joueur1"); // ligne 4
      placerJeton(plateau, 1, "joueur1"); // ligne 3
      placerJeton(plateau, 1, "joueur1"); // ligne 2
      placerJeton(plateau, 1, "joueur1"); // ligne 1
      placerJeton(plateau, 1, "joueur2"); // ligne 0

      expect(verifierDiagonales(plateau, "joueur2")).toBe(true);
    });

    test("détecte diagonale descendante à partir du bord gauche (\\)", () => {
      // Diagonale \ : (3,4), (2,3), (1,2), (0,1)
      placerJeton(plateau, 3, "joueur1"); // ligne 5
      placerJeton(plateau, 3, "joueur2"); // ligne 4

      placerJeton(plateau, 2, "joueur1"); // ligne 5
      placerJeton(plateau, 2, "joueur1"); // ligne 4
      placerJeton(plateau, 2, "joueur2"); // ligne 3

      placerJeton(plateau, 1, "joueur1"); // ligne 5
      placerJeton(plateau, 1, "joueur1"); // ligne 4
      placerJeton(plateau, 1, "joueur1"); // ligne 3
      placerJeton(plateau, 1, "joueur2"); // ligne 2

      placerJeton(plateau, 0, "joueur1"); // ligne 5
      placerJeton(plateau, 0, "joueur1"); // ligne 4
      placerJeton(plateau, 0, "joueur1"); // ligne 3
      placerJeton(plateau, 0, "joueur1"); // ligne 2
      placerJeton(plateau, 0, "joueur2"); // ligne 1

      expect(verifierDiagonales(plateau, "joueur2")).toBe(true);
    });

    test("retourne false sans diagonale complète", () => {
      placerJeton(plateau, 0, "joueur1");
      placerJeton(plateau, 1, "joueur2");
      placerJeton(plateau, 1, "joueur1");

      expect(verifierDiagonales(plateau, "joueur1")).toBe(false);
    });
  });
});
