# 🟩 Word Guess Game

A sleek, animated Wordle-style word guessing game built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**. Guess the hidden 5-letter word in 6 tries — with smooth flip animations, confetti celebrations, and persistent player stats.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

---

## ✨ Features

- **Classic Wordle Gameplay** — Guess a 5-letter word in up to 6 attempts
- **Color-Coded Feedback**
  - 🟩 **Green** — Correct letter in the correct position
  - 🟨 **Yellow** — Correct letter in the wrong position
  - ⬛ **Gray** — Letter not in the word
- **Smooth Animations** — Tile flip reveals, shake on invalid input, and bounce on win
- **Confetti Celebration** — Burst of confetti when you guess the word correctly
- **Animated Particle Background** — Dynamic floating particles for a premium visual feel
- **On-Screen Keyboard** — Tap-friendly virtual keyboard with real-time color updates
- **Physical Keyboard Support** — Full keyboard input via `keydown` events
- **Persistent Stats** — Tracks matches played, wins, current streak, and max streak via `localStorage`
- **Word Validation** — Only accepts guesses from a curated word list
- **Fully Responsive** — Scales beautifully from mobile to desktop

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org/)   |
| UI Library   | [React 19](https://react.dev/)      |
| Language     | TypeScript 5                        |
| Styling      | Tailwind CSS 4 + PostCSS            |
| Animations   | CSS animations + canvas-confetti    |
| Fonts        | Geist & Geist Mono (via next/font)  |
| Linting      | ESLint 9 + eslint-config-next       |

---

## 📁 Project Structure

```
wordle-game/
├── public/                      # Static assets
├── src/
│   └── app/
│       ├── components/
│       │   ├── WordleGame.tsx    # Root game component (orchestrator)
│       │   ├── GameBoard.tsx     # 6×5 grid of letter tiles
│       │   ├── Tile.tsx          # Individual tile with flip animation
│       │   ├── Keyboard.tsx      # On-screen keyboard
│       │   ├── GameMessage.tsx   # Win/loss/error messages + restart
│       │   ├── StatsDisplay.tsx  # Player statistics panel
│       │   ├── ConfettiEffect.tsx# Victory confetti burst
│       │   └── ParticleBackground.tsx  # Animated background particles
│       ├── hooks/
│       │   └── useGame.ts       # Core game logic & state management
│       ├── data/
│       │   └── words.ts         # Word list & validation helpers
│       ├── globals.css          # Global styles & Tailwind directives
│       ├── layout.tsx           # Root layout with metadata & fonts
│       ├── page.tsx             # Entry page
│       └── favicon.ico
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/navjot0079/Wordle.git
cd wordle-game

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 🎮 How to Play

1. Type a 5-letter word using your **keyboard** or the **on-screen keys**
2. Press **Enter** to submit your guess
3. Tiles will flip to reveal color-coded hints:
   - 🟩 Green = right letter, right spot
   - 🟨 Yellow = right letter, wrong spot
   - ⬛ Gray = letter not in the word
4. Use the hints to narrow down the answer within **6 tries**
5. Hit **Restart** after a win or loss to play again

---

## 🏗️ Architecture

The game follows a **hooks-driven architecture** with a clean separation of concerns:

```
page.tsx → WordleGame (orchestrator)
               ├── useGame()        ← all game logic & state
               ├── GameBoard        ← renders the tile grid
               │    └── Tile        ← individual animated tile
               ├── Keyboard         ← input + color feedback
               ├── GameMessage      ← status messages + restart
               ├── StatsDisplay     ← persistent statistics
               ├── ConfettiEffect   ← win celebration
               └── ParticleBackground ← ambient animation
```

- **`useGame` hook** — Owns all game state: board, current row/col, target word, keyboard colors, animations, and win/loss detection. Implements a two-pass algorithm for accurate letter-color assignment (handles duplicate letters correctly).
- **Stats persistence** — Player statistics are saved to `localStorage` and survive page refreshes.
- **Animation pipeline** — Tile flips are sequenced with staggered `setTimeout` calls (300ms per tile) for a satisfying cascade reveal.

---

## 📜 Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the development server             |
| `npm run build` | Create an optimized production build     |
| `npm start`     | Serve the production build               |
| `npm run lint`  | Run ESLint across the codebase           |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and not currently published under an open-source license.

---

<p align="center">
  Built with ❤️ using Next.js, React, and TypeScript
</p>
