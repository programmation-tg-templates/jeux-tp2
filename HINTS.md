# Indices pour Puissance 4

Ce fichier contient des indices progressifs pour vous aider. Cliquez sur les sections pour révéler les indices.

## Fonction 1 : creerPlateau

<details>
<summary>💡 Indice 1</summary>

Un plateau Puissance 4 fait toujours 6 lignes × 7 colonnes = 42 cases.

Retournez un objet avec :
- `largeur: 7`
- `hauteur: 6`
- `cases`: un tableau de 42 cases remplies de `"vide"`

</details>

<details>
<summary>💡 Indice 2 (solution)</summary>

```typescript
export function creerPlateau(): PlateauPuissance4 {
  return {
    largeur: 7,
    hauteur: 6,
    cases: new Array(42).fill("vide"),
  };
}
```

</details>

---

## Fonction 2 : obtenirPremiereLigneDispo

<details>
<summary>💡 Indice 1</summary>

La gravité fait tomber les jetons vers le bas. Il faut donc chercher **de bas en haut** (ligne 5 → ligne 0) dans la colonne donnée.

Retournez le numéro de la première ligne qui contient `"vide"` pour cette colonne.

Si toutes les cases sont occupées, retournez `null`.

</details>

<details>
<summary>💡 Indice 2</summary>

Algorithme :
```
Pour ligne de 5 à 0 (décroissant) :
  Calculer indice = ligne * 7 + colonne
  Si cases[indice] === "vide" :
    Retourner ligne
Retourner null (colonne pleine)
```

</details>

<details>
<summary>💡 Indice 3 (solution)</summary>

```typescript
export function obtenirPremiereLigneDispo(
  plateau: PlateauPuissance4,
  colonne: number
): number | null {
  for (let ligne = plateau.hauteur - 1; ligne >= 0; ligne--) {
    const indice = ligne * plateau.largeur + colonne;
    if (plateau.cases[indice] === "vide") {
      return ligne;
    }
  }
  return null;
}
```

</details>

---

## Fonction 3 : placerJeton

<details>
<summary>💡 Indice 1</summary>

Utilisez `obtenirPremiereLigneDispo` pour trouver où placer le jeton.

Si la fonction retourne `null`, la colonne est pleine → retournez `false`.

Sinon, placez le jeton à la ligne trouvée et retournez `true`.

</details>

<details>
<summary>💡 Indice 2 (solution)</summary>

```typescript
export function placerJeton(
  plateau: PlateauPuissance4,
  colonne: number,
  joueur: "joueur1" | "joueur2"
): boolean {
  const ligne = obtenirPremiereLigneDispo(plateau, colonne);

  if (ligne === null) {
    return false; // Colonne pleine
  }

  const indice = ligne * plateau.largeur + colonne;
  plateau.cases[indice] = joueur;
  return true;
}
```

</details>

---

## Fonction 4 : verifierLigne

<details>
<summary>💡 Indice 1</summary>

Pour chaque ligne, parcourez les colonnes et comptez les jetons consécutifs du joueur.

Si vous trouvez 4 jetons consécutifs, retournez `true`.

Important : Réinitialisez le compteur à 0 quand vous rencontrez une case différente.

</details>

<details>
<summary>💡 Indice 2</summary>

Algorithme pour une ligne :
```
compteur = 0
Pour chaque colonne de 0 à 6 :
  Si cases[ligne * 7 + col] === joueur :
    compteur++
    Si compteur === 4 : retourner true
  Sinon :
    compteur = 0
```

Répétez pour toutes les lignes (0 à 5).

</details>

<details>
<summary>💡 Indice 3 (solution)</summary>

```typescript
export function verifierLigne(plateau: PlateauPuissance4, joueur: CaseP4): boolean {
  for (let ligne = 0; ligne < plateau.hauteur; ligne++) {
    let compteur = 0;
    for (let col = 0; col < plateau.largeur; col++) {
      const indice = ligne * plateau.largeur + col;
      if (plateau.cases[indice] === joueur) {
        compteur++;
        if (compteur === 4) return true;
      } else {
        compteur = 0;
      }
    }
  }
  return false;
}
```

</details>

---

## Fonction 5 : verifierColonne

<details>
<summary>💡 Indice 1</summary>

C'est similaire à `verifierLigne`, mais parcourez verticalement.

Pour chaque colonne, parcourez les lignes de haut en bas et comptez les jetons consécutifs.

</details>

<details>
<summary>💡 Indice 2 (solution)</summary>

```typescript
export function verifierColonne(plateau: PlateauPuissance4, joueur: CaseP4): boolean {
  for (let col = 0; col < plateau.largeur; col++) {
    let compteur = 0;
    for (let ligne = 0; ligne < plateau.hauteur; ligne++) {
      const indice = ligne * plateau.largeur + col;
      if (plateau.cases[indice] === joueur) {
        compteur++;
        if (compteur === 4) return true;
      } else {
        compteur = 0;
      }
    }
  }
  return false;
}
```

</details>

---

## Fonction 6 : verifierDiagonales

<details>
<summary>💡 Indice 1</summary>

Il y a deux types de diagonales :
- **Descendantes** `\` : ligne et colonne augmentent ensemble
- **Montantes** `/` : ligne augmente, colonne diminue

Vérifiez les deux types séparément.

</details>

<details>
<summary>💡 Indice 2</summary>

**Diagonales descendantes `\`** :

Démarrez de chaque position possible et suivez la diagonale (ligne++, col++) :
```
Pour chaque position de départ (ligne, col) :
  compteur = 0
  Tant que dans les limites :
    Si cases[ligne * 7 + col] === joueur :
      compteur++
      Si compteur === 4 : retourner true
    Sinon :
      compteur = 0
    ligne++, col++
```

Positions de départ possibles : toutes les cases des 3 premières lignes et 4 premières colonnes.

</details>

<details>
<summary>💡 Indice 3 (solution partielle - diagonales descendantes)</summary>

```typescript
export function verifierDiagonales(plateau: PlateauPuissance4, joueur: CaseP4): boolean {
  const { largeur, hauteur, cases } = plateau;

  // Diagonales descendantes \
  for (let ligneDepart = 0; ligneDepart <= hauteur - 4; ligneDepart++) {
    for (let colDepart = 0; colDepart <= largeur - 4; colDepart++) {
      let compteur = 0;
      for (let offset = 0; offset < 4; offset++) {
        const ligne = ligneDepart + offset;
        const col = colDepart + offset;
        const indice = ligne * largeur + col;
        if (cases[indice] === joueur) {
          compteur++;
        } else {
          break;
        }
      }
      if (compteur === 4) return true;
    }
  }

  // Diagonales montantes / (similaire mais col diminue)
  // ... à implémenter

  return false;
}
```

</details>

<details>
<summary>💡 Indice 4 (solution complète)</summary>

```typescript
export function verifierDiagonales(plateau: PlateauPuissance4, joueur: CaseP4): boolean {
  const { largeur, hauteur, cases } = plateau;

  // Diagonales descendantes \
  for (let ligneDepart = 0; ligneDepart <= hauteur - 4; ligneDepart++) {
    for (let colDepart = 0; colDepart <= largeur - 4; colDepart++) {
      let compteur = 0;
      for (let offset = 0; offset < 4; offset++) {
        const ligne = ligneDepart + offset;
        const col = colDepart + offset;
        const indice = ligne * largeur + col;
        if (cases[indice] === joueur) {
          compteur++;
        } else {
          break;
        }
      }
      if (compteur === 4) return true;
    }
  }

  // Diagonales montantes /
  for (let ligneDepart = 0; ligneDepart <= hauteur - 4; ligneDepart++) {
    for (let colDepart = largeur - 1; colDepart >= 3; colDepart--) {
      let compteur = 0;
      for (let offset = 0; offset < 4; offset++) {
        const ligne = ligneDepart + offset;
        const col = colDepart - offset;
        const indice = ligne * largeur + col;
        if (cases[indice] === joueur) {
          compteur++;
        } else {
          break;
        }
      }
      if (compteur === 4) return true;
    }
  }

  return false;
}
```

</details>

---

## Fonction 7 (BONUS) : verifierMatchNul

<details>
<summary>💡 Indice 1</summary>

Un match nul arrive quand toutes les 42 cases sont occupées (aucune case `"vide"`).

Parcourez le tableau `cases` et vérifiez qu'aucune case ne vaut `"vide"`.

</details>

<details>
<summary>💡 Indice 2 (solution)</summary>

```typescript
export function verifierMatchNul(plateau: PlateauPuissance4): boolean {
  return plateau.cases.every(c => c !== "vide");
}
```

Ou version avec boucle :
```typescript
export function verifierMatchNul(plateau: PlateauPuissance4): boolean {
  for (const c of plateau.cases) {
    if (c === "vide") {
      return false;
    }
  }
  return true;
}
```

</details>

---

## Astuces générales

- **Visualisez les indices** : Dessinez un plateau 6×7 et numérotez les cases de 0 à 41
- **Testez fonction par fonction** : Ne passez pas à la suivante tant que la précédente ne fonctionne pas
- **Utilisez console.log()** : Affichez les indices calculés pour vérifier vos formules
- **Décomposez les problèmes** : Pour les diagonales, traitez d'abord `\`, puis `/`
- **Jouez dans le navigateur** : L'interface vous montre visuellement les erreurs

Bon courage ! 🚀
