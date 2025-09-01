# Tic Tac Toe Frontend

A modern, minimalistic Next.js app for playing Tic Tac Toe locally against another player or a simple AI.

## Features
- Interactive 3x3 board
- Local two-player mode (same device)
- Play against simple AI (tries to win, blocks, otherwise random)
- In-memory score tracking for X, O, and Draws
- Restart current game and reset scores
- Responsive, accessible light UI using the provided color scheme

## Tech
- Next.js App Router
- TypeScript + React
- Tailwind CSS v4 (pre-configured by template)
- No external backend (in-memory state only)

## Getting Started
1. Install dependencies:
   - npm install

2. Run the development server:
   - npm run dev

3. Open your browser:
   - http://localhost:3000

## Notes
- In AI mode: You are X and the AI is O. X always starts first.
- Scores are kept in memory and reset when you refresh the page or click "Reset Scores".
