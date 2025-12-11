// Tests unitaires écrits par l'enseignant. Ne modifiez pas ce fichier.

import { describe, expect, test } from "vitest";
import { creerPlateau } from "../index";

describe("Création du plateau", () => {
  test("crée un plateau 6×7", () => {
    const plateau = creerPlateau();
    expect(plateau.largeur).toBe(7);
    expect(plateau.hauteur).toBe(6);
  });

  test("crée un tableau de 42 cases", () => {
    const plateau = creerPlateau();
    expect(plateau.cases.length).toBe(42);
  });

  test('initialise toutes les cases à "vide"', () => {
    const plateau = creerPlateau();
    expect(plateau.cases.every((c) => c === "vide")).toBe(true);
  });

  test("retourne un nouveau plateau à chaque appel", () => {
    const plateau1 = creerPlateau();
    const plateau2 = creerPlateau();
    expect(plateau1).not.toBe(plateau2);
    expect(plateau1.cases).not.toBe(plateau2.cases);
  });
});
