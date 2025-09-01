"use client";

import React, { useCallback, useMemo, useState } from "react";

type Player = "X" | "O";
type Cell = Player | null;
type GameMode = "two-player" | "ai";

interface Score {
  X: number;
  O: number;
  draws: number;
}

// PUBLIC_INTERFACE
export default function Home() {
  /** Root page for the Tic Tac Toe app.
   * Renders the interactive board, controls, and score tracking.
   * Features:
   * - Local two-player mode
   * - Play against simple AI (win/block/random)
   * - In-memory score tracking
   * - Restart game and reset scores
   * - Responsive, modern, minimalistic light UI
   * Returns: React component
   */
  const [mode, setMode] = useState<GameMode>("two-player");
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [current, setCurrent] = useState<Player>("X");
  const [scores, setScores] = useState<Score>({ X: 0, O: 0, draws: 0 });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | "draw" | null>(null);

  const winningLines = useMemo(
    () => [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    []
  );

  const colors = {
    primary: "#0070f3",
    secondary: "#1db954",
    accent: "#f39c12",
    bg: "#f7f9fc",
    text: "#1a1a1a",
    subtle: "#e6eaf0",
    white: "#ffffff",
  };

  const computeWinner = useCallback(
    (cells: Cell[]): Player | null => {
      for (const [a, b, c] of winningLines) {
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
          return cells[a];
        }
      }
      return null;
    },
    [winningLines]
  );

  const isBoardFull = (cells: Cell[]) => cells.every((c) => c !== null);

  const updateOutcome = useCallback(
    (cells: Cell[]) => {
      const w = computeWinner(cells);
      if (w) {
        setWinner(w);
        setGameOver(true);
        setScores((s) => ({ ...s, [w]: s[w] + 1 }));
        return true;
      }
      if (isBoardFull(cells)) {
        setWinner("draw");
        setGameOver(true);
        setScores((s) => ({ ...s, draws: s.draws + 1 }));
        return true;
      }
      return false;
    },
    [computeWinner]
  );

  // Basic AI with simple heuristic: try to win, then block, otherwise random.
  const aiMove = useCallback(
    (cells: Cell[], aiPlayer: Player): number | null => {
      const human: Player = aiPlayer === "X" ? "O" : "X";

      // Try to win
      for (let i = 0; i < 9; i++) {
        if (cells[i] === null) {
          const clone = [...cells];
          clone[i] = aiPlayer;
          if (computeWinner(clone) === aiPlayer) return i;
        }
      }
      // Try to block
      for (let i = 0; i < 9; i++) {
        if (cells[i] === null) {
          const clone = [...cells];
          clone[i] = human;
          if (computeWinner(clone) === human) return i;
        }
      }
      // Otherwise random
      const empties = cells
        .map((v, idx) => (v === null ? idx : -1))
        .filter((v) => v !== -1);
      if (empties.length === 0) return null;
      const choice = empties[Math.floor(Math.random() * empties.length)];
      return choice;
    },
    [computeWinner]
  );

  const handleCellClick = (index: number) => {
    if (board[index] || gameOver) return;

    const next = [...board];
    next[index] = current;
    setBoard(next);

    if (updateOutcome(next)) return;

    const nextPlayer: Player = current === "X" ? "O" : "X";
    setCurrent(nextPlayer);

    // If AI mode and it's AI's turn, make AI move
    if (mode === "ai" && nextPlayer === "O") {
      setTimeout(() => {
        const aiIdx = aiMove(next, "O");
        if (aiIdx !== null && next[aiIdx] === null && !gameOver) {
          const afterAi = [...next];
          afterAi[aiIdx] = "O";
          setBoard(afterAi);
          if (updateOutcome(afterAi)) return;
          setCurrent("X");
        }
      }, 250);
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrent("X");
    setGameOver(false);
    setWinner(null);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    restartGame();
  };

  const onChangeMode = (newMode: GameMode) => {
    setMode(newMode);
    restartGame();
  };

  return (
    <main
      className="min-h-screen w-full"
      style={{
        background: colors.bg,
        color: colors.text,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          borderBottom: `1px solid ${colors.subtle}`,
          background: colors.white,
        }}
        className="w-full"
      >
        <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              aria-hidden
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            />
            <h1 className="text-xl sm:text-2xl font-semibold">Tic Tac Toe</h1>
          </div>
          <div className="text-sm opacity-80">
            Modern, minimalistic, light theme
          </div>
        </div>
      </header>

      <section className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-8 sm:py-10">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Board Section */}
            <div className="w-full">
              <div className="flex flex-col items-center">
                <div className="text-sm uppercase tracking-wide mb-2 opacity-80">
                  {mode === "ai" ? "You vs AI" : "Local Two-Player"}
                </div>
                <div
                  className="text-base sm:text-lg font-medium mb-4 rounded-full px-4 py-1"
                  style={{
                    background: colors.white,
                    border: `1px solid ${colors.subtle}`,
                  }}
                >
                  {gameOver ? (
                    winner === "draw" ? (
                      <span style={{ color: colors.accent }}>Draw!</span>
                    ) : (
                      <span>
                        Winner:{" "}
                        <strong
                          style={{
                            color:
                              winner === "X" ? colors.primary : colors.secondary,
                          }}
                        >
                          {winner}
                        </strong>
                      </span>
                    )
                  ) : (
                    <span>
                      Turn:{" "}
                      <strong
                        style={{
                          color:
                            current === "X" ? colors.primary : colors.secondary,
                        }}
                      >
                        {current}
                      </strong>
                    </span>
                  )}
                </div>

                {/* Responsive Square Board */}
                <div
                  className="grid grid-cols-3 gap-2 sm:gap-3"
                  style={{
                    width: "min(92vw, 420px)",
                  }}
                >
                  {board.map((cell, idx) => {
                    const isX = cell === "X";
                    const isO = cell === "O";
                    return (
                      <button
                        key={idx}
                        aria-label={`Cell ${idx + 1}`}
                        onClick={() => handleCellClick(idx)}
                        className="aspect-square rounded-xl font-bold text-4xl sm:text-5xl flex items-center justify-center transition-colors"
                        style={{
                          border: `1px solid ${colors.subtle}`,
                          background: colors.white,
                          color: isX
                            ? colors.primary
                            : isO
                            ? colors.secondary
                            : colors.text,
                          boxShadow:
                            cell === null
                              ? "0 1px 2px rgba(0,0,0,0.04)"
                              : "inset 0 1px 2px rgba(0,0,0,0.04)",
                        }}
                        disabled={!!cell || gameOver}
                      >
                        {cell ?? ""}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={restartGame}
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{
                      background: colors.primary,
                      color: colors.white,
                    }}
                  >
                    Restart
                  </button>
                  <button
                    onClick={resetScores}
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{
                      background: colors.accent,
                      color: colors.white,
                    }}
                  >
                    Reset Scores
                  </button>
                </div>
              </div>
            </div>

            {/* Controls & Score Section */}
            <div className="w-full">
              <div
                className="rounded-2xl p-5 sm:p-6"
                style={{
                  background: colors.white,
                  border: `1px solid ${colors.subtle}`,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                }}
              >
                <h2 className="text-lg font-semibold mb-4">Game Settings</h2>

                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => onChangeMode("two-player")}
                    className="px-3 py-2 rounded-lg text-sm font-medium flex-1"
                    style={{
                      border: `1px solid ${colors.subtle}`,
                      background:
                        mode === "two-player" ? colors.primary : colors.white,
                      color: mode === "two-player" ? colors.white : colors.text,
                    }}
                  >
                    Two-Player
                  </button>
                  <button
                    onClick={() => onChangeMode("ai")}
                    className="px-3 py-2 rounded-lg text-sm font-medium flex-1"
                    style={{
                      border: `1px solid ${colors.subtle}`,
                      background: mode === "ai" ? colors.secondary : colors.white,
                      color: mode === "ai" ? colors.white : colors.text,
                    }}
                  >
                    Play vs AI
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-sm opacity-80">
                    Symbols: X goes first. In AI mode you are X, AI is O.
                  </p>
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{
                    border: `1px solid ${colors.subtle}`,
                    background: "#fbfcff",
                  }}
                >
                  <h3 className="font-medium mb-3">Score</h3>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-lg p-3" style={{ background: "#f0f6ff" }}>
                      <div
                        className="text-xs uppercase tracking-wide mb-1"
                        style={{ color: colors.primary }}
                      >
                        X
                      </div>
                      <div className="text-2xl font-bold">{scores.X}</div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: "#f0fff5" }}>
                      <div
                        className="text-xs uppercase tracking-wide mb-1"
                        style={{ color: colors.secondary }}
                      >
                        O
                      </div>
                      <div className="text-2xl font-bold">{scores.O}</div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: "#fff8ee" }}>
                      <div
                        className="text-xs uppercase tracking-wide mb-1"
                        style={{ color: colors.accent }}
                      >
                        Draws
                      </div>
                      <div className="text-2xl font-bold">{scores.draws}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-sm opacity-80">
                  <p>
                    Tip: Use Restart to begin a new round. Use Reset Scores to
                    clear the scoreboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer spacing on mobile */}
          <div className="h-6" />
        </div>
      </section>

      <footer
        className="w-full"
        style={{
          borderTop: `1px solid ${colors.subtle}`,
          background: colors.white,
        }}
      >
        <div className="mx-auto max-w-5xl px-6 py-5 text-sm flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div>Built with Next.js. Light, minimal, and responsive.</div>
          <div className="flex items-center gap-2">
            <span className="opacity-70">Theme colors:</span>
            <span
              className="inline-block w-3 h-3 rounded"
              style={{ background: colors.primary }}
              aria-label="primary color"
            />
            <span
              className="inline-block w-3 h-3 rounded"
              style={{ background: colors.secondary }}
              aria-label="secondary color"
            />
            <span
              className="inline-block w-3 h-3 rounded"
              style={{ background: colors.accent }}
              aria-label="accent color"
            />
          </div>
        </div>
      </footer>
    </main>
  );
}
