// Import des fonctions depuis le code étudiant
import {
  creerPlateau,
  placerJeton,
  verifierColonne,
  verifierDiagonales,
  verifierLigne,
  verifierMatchNul,
} from "./index.ts";
import type { JoueurP4, PlateauPuissance4 } from "./index.ts";

// ============================================================================
// État du jeu
// ============================================================================

let plateau: PlateauPuissance4;
let currentPlayer: JoueurP4 = "joueur1";
let moveCount = 0;
let isGameOver = false;

// ============================================================================
// Emojis pour les jetons
// ============================================================================

const EMOJIS = {
  vide: "⚪",
  joueur1: "🔴",
  joueur2: "🟡",
};

// ============================================================================
// Initialisation du jeu
// ============================================================================

function initGame() {
  try {
    plateau = creerPlateau();
    currentPlayer = "joueur1";
    moveCount = 0;
    isGameOver = false;

    renderBoard();
    updateStats();
    showMessage("");
  } catch (error: any) {
    showMessage(`Erreur lors de l'initialisation : ${error.message}`, "error");
    console.error("Erreur initialisation:", error);
  }
}

// ============================================================================
// Rendu du plateau
// ============================================================================

function renderBoard() {
  const boardEl = document.getElementById("game-board");
  if (!plateau) {
    boardEl!.innerHTML =
      '<p class="error">Plateau non initialisé. Vérifiez votre fonction creerPlateau().</p>';
    return;
  }

  boardEl!.innerHTML = "";

  for (let ligne = 0; ligne < plateau.hauteur; ligne++) {
    for (let col = 0; col < plateau.largeur; col++) {
      const indice = ligne * plateau.largeur + col;
      const etatCase = plateau.cases[indice];

      const cell = document.createElement("div");
      cell.className = `cell ${etatCase}`;
      cell.textContent = EMOJIS[etatCase];
      cell.dataset.column = `${col}`;

      if (!isGameOver && etatCase === "vide") {
        cell.addEventListener("click", () => handleColumnClick(col));
      }

      boardEl!.appendChild(cell);
    }
  }
}

// ============================================================================
// Gestion des clics sur les colonnes
// ============================================================================

function handleColumnClick(column: number) {
  if (isGameOver || !plateau) return;

  try {
    const success = placerJeton(plateau, column, currentPlayer);

    if (success) {
      moveCount++;
      renderBoard();
      updateStats();

      // Vérifier victoire
      if (checkWin(currentPlayer)) {
        isGameOver = true;
        showMessage(
          `🎉 ${currentPlayer === "joueur1" ? "Joueur 1" : "Joueur 2"} gagne !`,
          "success",
        );
        return;
      }

      // Vérifier match nul
      if (verifierMatchNul(plateau)) {
        isGameOver = true;
        showMessage("Match nul ! Plateau complet.", "success");
        return;
      }

      // Changer de joueur
      currentPlayer = currentPlayer === "joueur1" ? "joueur2" : "joueur1";
      updateStats();
    } else {
      showMessage("Colonne pleine !", "error");
      setTimeout(() => showMessage(""), 1500);
    }
  } catch (error: any) {
    showMessage(`Erreur : ${error.message}`, "error");
    console.error("Erreur placement:", error);
  }
}

// ============================================================================
// Vérification de victoire
// ============================================================================

function checkWin(player: JoueurP4): boolean {
  try {
    return (
      verifierLigne(plateau, player) ||
      verifierColonne(plateau, player) ||
      verifierDiagonales(plateau, player)
    );
  } catch (error: any) {
    console.error("Erreur vérification victoire:", error);
    return false;
  }
}

// ============================================================================
// Mise à jour des statistiques
// ============================================================================

function updateStats() {
  const playerDisplay = document.getElementById("current-player-display");
  if (playerDisplay) {
    playerDisplay.textContent =
      currentPlayer === "joueur1" ? "🔴 Joueur 1" : "🟡 Joueur 2";
    playerDisplay.className = `player-indicator ${currentPlayer}`;
  }

  const moveCountEl = document.getElementById("move-count");
  if (moveCountEl) {
    moveCountEl.textContent = `${moveCount}`;
  }
}

// ============================================================================
// Messages
// ============================================================================

function showMessage(text: string, type = "") {
  const messageEl = document.getElementById("game-message");
  if (messageEl) {
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
  }
}

// ============================================================================
// Gestion des événements
// ============================================================================

const resetBtn = document.getElementById("btn-reset");
if (resetBtn) {
  resetBtn.addEventListener("click", initGame);
}

// ============================================================================
// Polling des résultats de tests (JSON Vitest)
// ============================================================================

async function loadTestResults() {
  try {
    const response = await fetch("/test-results.json");
    if (!response.ok) return;

    const data = await response.json();
    if (!data.testResults) return;

    let totalTests = 0;
    let passedTests = 0;

    data.testResults.forEach((suite: any) => {
      suite.assertionResults.forEach((test: any) => {
        totalTests++;
        if (test.status === "passed") passedTests++;
      });
    });

    const testsTotal = document.getElementById("tests-total");
    const testsPassed = document.getElementById("tests-passed");
    if (testsTotal) testsTotal.textContent = `${totalTests}`;
    if (testsPassed) testsPassed.textContent = `${passedTests}`;

    const percentage = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
      progressBar.textContent = `${Math.round(percentage)}%`;
    }
  } catch (error: any) {
    // Silence - le fichier peut ne pas exister encore
  }
}

// Polling toutes les 2 secondes
setInterval(loadTestResults, 2000);
loadTestResults();

// ============================================================================
// Démarrage du jeu
// ============================================================================

initGame();
