# Programmation - TP Jeux - Puissance 4

## Présentation

Bienvenue dans ce TP où vous allez implémenter la logique du célèbre jeu Puissance 4. Votre objectif est de coder les fonctions TypeScript qui permettront à deux joueurs de placer des jetons et de détecter les victoires (4 jetons alignés).

Ce TP approfondit la manipulation de **tableaux 1D** avec calculs d'indices complexes, la détection d'alignements multidirectionnels, et la logique de jeu à deux joueurs.

## Compétences visées

- Manipulation avancée de tableaux 1D (parcours multidirectionnels)
- Calcul d'indices pour lignes, colonnes et diagonales
- Logique de gravité (simulation de chute)
- Détection de motifs (4 jetons alignés)
- Types TypeScript personnalisés (`type`)
- Gestion de l'état du jeu (tour par tour)
- Structures de contrôle complexes (boucles imbriquées, compteurs)

## Prérequis

- Node.js 18 ou supérieur
- npm (inclus avec Node.js)
- Un éditeur de code (WebStorm recommandé)
- **Avoir terminé le TP1 (Labyrinthe)** - les concepts de tableaux 1D et conversion d'indices sont réutilisés

## Installation

Clonez ce dépôt et installez les dépendances :

```bash
npm install
```

## Utilisation

### Lancer le jeu en mode développement

Pour voir votre jeu en action dans le navigateur :

```bash
npm run dev
```

Puis ouvrez votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`).

### Lancer les tests

Pour exécuter les tests une seule fois :

```bash
npm test
```

### Lancer les tests en mode watch

Pour voir les résultats en temps réel :

```bash
npm run watch
```

Les résultats des tests s'affichent également dans l'interface web !

## Description du jeu

Implémentez les fonctions permettant de jouer au Puissance 4 :

- Le plateau fait **6 lignes × 7 colonnes** (42 cases)
- Les jetons **tombent** par gravité (ils s'empilent du bas vers le haut)
- Un joueur gagne en alignant **4 jetons** (horizontal, vertical ou diagonal)
- Le plateau est représenté par un **tableau 1D** de 42 cases

### Représentation du plateau

```
Visuel :          Indices dans le tableau 1D :
─────────         ─────────────────────────────
| | | | | | | |   [0][1][2][3][4][5][6]         (ligne 0)
| | | | | | | |   [7][8][9][10][11][12][13]    (ligne 1)
| | | | | | | |   [14][15][16][17][18][19][20] (ligne 2)
| | | | | | | |   [21][22][23][24][25][26][27] (ligne 3)
| | | | | | | |   [28][29][30][31][32][33][34] (ligne 4)
| | | | | | | |   [35][36][37][38][39][40][41] (ligne 5)
```

**Formule** : `indice = ligne * largeur + colonne`

## Fonctions à implémenter

Toutes les fonctions sont dans [src/index.ts](src/index.ts).

### Niveau 1 : Structure de base (⭐ Simple)

1. **`creerPlateau`** : Créer un plateau 6×7 vide
2. **`obtenirPremiereLigneDispo`** : Trouver la première ligne libre dans une colonne (gravité)

### Niveau 2 : Logique de jeu (⭐⭐ Moyen)

3. **`placerJeton`** : Placer un jeton dans une colonne
4. **`verifierLigne`** : Détecter 4 jetons alignés horizontalement

### Niveau 3 : Détection victoire complexe (⭐⭐⭐ Difficile)

5. **`verifierColonne`** : Détecter 4 jetons alignés verticalement
6. **`verifierDiagonales`** : Détecter 4 jetons en diagonale (/ et \)

### Bonus (⭐ Simple, optionnel)

7. **`verifierMatchNul`** : Vérifier si le plateau est plein

## Ressources

### Documentation TypeScript

- [TypeScript Handbook - Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript - Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

### Documentation JavaScript

- [MDN - Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN - Boucles](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [MDN - Opérateurs de comparaison](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators)

### Aide-mémoire : Parcours de tableau

| Direction    | Formule indice    | Exemple (largeur=7)               |
| ------------ | ----------------- | --------------------------------- |
| Ligne (→)    | `ligne * 7 + col` | Ligne 2 : indices 14 à 20         |
| Colonne (↓)  | `ligne * 7 + col` | Colonne 3 : 3, 10, 17, 24, 31, 38 |
| Diagonale \  | `ligne * 7 + col` | (0,0)→(1,1)→(2,2) : 0, 8, 16      |
| Diagonale /  | `ligne * 7 + col` | (0,3)→(1,2)→(2,1) : 3, 9, 15      |

## Structure du projet

```
jeux-tp2-puissance4/
├── src/
│   ├── index.ts              # Votre code ici
│   └── test/                 # Tests (NE PAS MODIFIER)
│       ├── plateau.test.ts
│       ├── gravite.test.ts
│       ├── jeu.test.ts
│       ├── victoire.test.ts
│       └── bonus.test.ts
├── public/                   # Interface graphique
│   ├── index.html
│   ├── style.css
│   └── app.js
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Conseils

1. **Réutilisez les concepts du TP1** : Les conversions d'indices sont similaires au Labyrinthe.

2. **Testez la gravité d'abord** : Assurez-vous que `obtenirPremiereLigneDispo` fonctionne avant d'implémenter `placerJeton`.

3. **Décomposez les vérifications** : Pour `verifierDiagonales`, traitez les diagonales montantes et descendantes séparément.

4. **Utilisez des compteurs** : Pour détecter 4 jetons alignés, comptez les jetons consécutifs identiques.

5. **Visualisez dans le navigateur** : Utilisez `npm run dev` pour voir le jeu en action.

6. **Consultez HINTS.md** : Si vous êtes bloqué, consultez [HINTS.md](HINTS.md) pour des indices progressifs.

## Aide

Si vous avez des questions pendant le TP, n'hésitez pas à demander de l'aide à l'enseignant.

Bon courage ! 🎮
