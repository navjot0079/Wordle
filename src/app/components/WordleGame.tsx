'use client';

import { useGame } from '../hooks/useGame';
import GameBoard from './GameBoard';
import Keyboard from './Keyboard';
import GameMessage from './GameMessage';
import ConfettiEffect from './ConfettiEffect';
import ParticleBackground from './ParticleBackground';
import StatsDisplay from './StatsDisplay';

export default function WordleGame() {
    const { gameState, stats, addLetter, submitGuess, removeLetter, resetGame } = useGame();

    return (
        <div className="min-h-screen animated-bg flex flex-col items-center justify-start py-8 px-4 relative overflow-hidden">
            <ParticleBackground />
            <ConfettiEffect gameStatus={gameState.gameStatus} />

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 floating-title glowing-text z-10">
                Word Guess Game
            </h1>

            {/* Stats Display */}
            <StatsDisplay stats={stats} />

            {/* Game Container */}
            <div className="flex flex-col items-center z-10">
                {/* Game Board */}
                <GameBoard
                    board={gameState.board}
                    currentRow={gameState.currentRow}
                    isShaking={gameState.isShaking}
                    isBouncing={gameState.isBouncing}
                    gameStatus={gameState.gameStatus}
                />

                {/* Game Message */}
                <GameMessage
                    message={gameState.message}
                    gameStatus={gameState.gameStatus}
                    onRestart={resetGame}
                />

                {/* Keyboard */}
                <Keyboard
                    keyboardColors={gameState.keyboardColors}
                    onKeyPress={addLetter}
                    onEnter={submitGuess}
                    onBackspace={removeLetter}
                />
            </div>

            {/* Instructions */}
            <div className="mt-8 text-gray-400 text-sm text-center max-w-md z-10">
                <p>Guess the hidden 5-letter word in 6 tries.</p>
                <p className="mt-2">
                    <span className="text-green-500">Green</span> = correct position,{' '}
                    <span className="text-yellow-500">Yellow</span> = wrong position,{' '}
                    <span className="text-gray-500">Gray</span> = not in word
                </p>
            </div>
        </div>
    );
}
