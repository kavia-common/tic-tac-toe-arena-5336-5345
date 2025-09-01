# Tic Tac Toe Frontend (Next.js)

A modern, minimalistic Tic Tac Toe game built with Next.js App Router and Tailwind CSS v4.

Features:
- Interactive Tic Tac Toe board
- Local two-player mode (same device)
- Play vs simple AI (heuristic: win > block > random)
- In-memory score tracking (X, O, Draws)
- Restart current round and reset all scores
- Responsive/mobile-first layout
- Light theme styling with provided color scheme

Tech:
- Next.js 15 App Router
- React 19
- Tailwind CSS v4 (via @tailwindcss/postcss)

Scripts:
- npm run dev — start development server
- npm run build — production build
- npm run start — start production server (after build)

Project Structure:
- src/app/layout.tsx — global layout
- src/app/page.tsx — game UI and logic
- src/app/globals.css — Tailwind and light theme variables
- src/app/metadata.ts — SEO metadata

Notes:
- Scoreboard is in-memory and resets on page reload.
- In AI mode, the human is X and always goes first; AI plays O.
- Restart resets the current board only. Reset Scores clears X/O/Draw counters and restarts the round.

Accessibility:
- Buttons have aria-labels for grid cells.
- Clear status displays for turn, winner, or draw.

Styling:
- Modern, minimal, light. Colors:
  - primary: #0070f3
  - secondary: #1db954
  - accent: #f39c12
  - bg: #f7f9fc

License:
- MIT
