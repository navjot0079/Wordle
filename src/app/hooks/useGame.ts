'use client';

import { useState, useCallback, useEffect } from 'react';
import { getRandomWord, isValidWord } from '../data/words';

export type TileState = 'empty' | 'filled' | 'correct' | 'present' | 'absent';
export type GameStatus = 'playing' | 'won' | 'lost';

export interface Tile {
    letter: string;
    state: TileState;
    isFlipping: boolean;
    isRevealed: boolean;
}

export interface GameStats {
    matchesPlayed: number;
    wins: number;
    currentStreak: number;
    maxStreak: number;
}

const STATS_STORAGE_KEY = 'wordle-game-stats';

const getStoredStats = (): GameStats => {
    if (typeof window === 'undefined') {
        return { matchesPlayed: 0, wins: 0, currentStreak: 0, maxStreak: 0 };
    }
    try {
        const stored = localStorage.getItem(STATS_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load stats:', e);
    }
    return { matchesPlayed: 0, wins: 0, currentStreak: 0, maxStreak: 0 };
};

const saveStats = (stats: GameStats) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
        console.error('Failed to save stats:', e);
    }
};

export interface GameState {
    board: Tile[][];
    currentRow: number;
    currentCol: number;
    targetWord: string;
    gameStatus: GameStatus;
    keyboardColors: Record<string, TileState>;
    isShaking: boolean;
    isBouncing: boolean;
    message: string;
}

const createEmptyBoard = (): Tile[][] => {
    return Array(6).fill(null).map(() =>
        Array(5).fill(null).map(() => ({
            letter: '',
            state: 'empty' as TileState,
            isFlipping: false,
            isRevealed: false,
        }))
    );
};

export function useGame() {
    const [gameState, setGameState] = useState<GameState>(() => ({
        board: createEmptyBoard(),
        currentRow: 0,
        currentCol: 0,
        targetWord: getRandomWord(),
        gameStatus: 'playing',
        keyboardColors: {},
        isShaking: false,
        isBouncing: false,
        message: '',
    }));

    const [stats, setStats] = useState<GameStats>(() => getStoredStats());
    const [hasUpdatedStats, setHasUpdatedStats] = useState(false);

    // Load stats from localStorage on mount (client-side only)
    useEffect(() => {
        setStats(getStoredStats());
    }, []);

    // Update stats when game ends
    useEffect(() => {
        if (hasUpdatedStats) return;
        if (gameState.gameStatus === 'won') {
            setStats(prev => {
                const newStats = {
                    matchesPlayed: prev.matchesPlayed + 1,
                    wins: prev.wins + 1,
                    currentStreak: prev.currentStreak + 1,
                    maxStreak: Math.max(prev.maxStreak, prev.currentStreak + 1),
                };
                saveStats(newStats);
                return newStats;
            });
            setHasUpdatedStats(true);
        } else if (gameState.gameStatus === 'lost') {
            setStats(prev => {
                const newStats = {
                    matchesPlayed: prev.matchesPlayed + 1,
                    wins: prev.wins,
                    currentStreak: 0,
                    maxStreak: prev.maxStreak,
                };
                saveStats(newStats);
                return newStats;
            });
            setHasUpdatedStats(true);
        }
    }, [gameState.gameStatus, hasUpdatedStats]);

    const addLetter = useCallback((letter: string) => {
        if (gameState.gameStatus !== 'playing') return;
        if (gameState.currentCol >= 5) return;

        setGameState(prev => {
            const newBoard = prev.board.map(row => row.map(tile => ({ ...tile })));
            newBoard[prev.currentRow][prev.currentCol] = {
                letter: letter.toUpperCase(),
                state: 'filled',
                isFlipping: false,
                isRevealed: false,
            };

            return {
                ...prev,
                board: newBoard,
                currentCol: prev.currentCol + 1,
            };
        });
    }, [gameState.gameStatus, gameState.currentCol]);

    const removeLetter = useCallback(() => {
        if (gameState.gameStatus !== 'playing') return;
        if (gameState.currentCol <= 0) return;

        setGameState(prev => {
            const newBoard = prev.board.map(row => row.map(tile => ({ ...tile })));
            newBoard[prev.currentRow][prev.currentCol - 1] = {
                letter: '',
                state: 'empty',
                isFlipping: false,
                isRevealed: false,
            };

            return {
                ...prev,
                board: newBoard,
                currentCol: prev.currentCol - 1,
            };
        });
    }, [gameState.gameStatus, gameState.currentCol]);

    const submitGuess = useCallback(() => {
        if (gameState.gameStatus !== 'playing') return;
        if (gameState.currentCol < 5) {
            // Shake animation for incomplete word
            setGameState(prev => ({ ...prev, isShaking: true, message: 'Not enough letters' }));
            setTimeout(() => {
                setGameState(prev => ({ ...prev, isShaking: false, message: '' }));
            }, 500);
            return;
        }

        const currentGuess = gameState.board[gameState.currentRow]
            .map(tile => tile.letter)
            .join('');

        if (!isValidWord(currentGuess)) {
            setGameState(prev => ({ ...prev, isShaking: true, message: 'Not in word list' }));
            setTimeout(() => {
                setGameState(prev => ({ ...prev, isShaking: false, message: '' }));
            }, 500);
            return;
        }

        // Check letters and assign colors
        const targetLetters = gameState.targetWord.split('');
        const guessLetters = currentGuess.split('');
        const result: TileState[] = Array(5).fill('absent');
        const targetLetterCount: Record<string, number> = {};

        // Count letters in target word
        targetLetters.forEach(letter => {
            targetLetterCount[letter] = (targetLetterCount[letter] || 0) + 1;
        });

        // First pass: mark correct letters
        guessLetters.forEach((letter, index) => {
            if (letter === targetLetters[index]) {
                result[index] = 'correct';
                targetLetterCount[letter]--;
            }
        });

        // Second pass: mark present letters
        guessLetters.forEach((letter, index) => {
            if (result[index] !== 'correct' && targetLetterCount[letter] > 0) {
                result[index] = 'present';
                targetLetterCount[letter]--;
            }
        });

        // Update board with results and animate
        const newBoard = gameState.board.map(row => row.map(tile => ({ ...tile })));
        const newKeyboardColors = { ...gameState.keyboardColors };

        // Start flip animation
        result.forEach((state, index) => {
            setTimeout(() => {
                setGameState(prev => {
                    const updatedBoard = prev.board.map(row => row.map(tile => ({ ...tile })));
                    updatedBoard[prev.currentRow][index] = {
                        ...updatedBoard[prev.currentRow][index],
                        isFlipping: true,
                    };
                    return { ...prev, board: updatedBoard };
                });

                // Reveal after half of flip
                setTimeout(() => {
                    setGameState(prev => {
                        const updatedBoard = prev.board.map(row => row.map(tile => ({ ...tile })));
                        updatedBoard[prev.currentRow][index] = {
                            ...updatedBoard[prev.currentRow][index],
                            state: state,
                            isRevealed: true,
                        };

                        // Update keyboard colors
                        const letter = guessLetters[index];
                        const currentColor = prev.keyboardColors[letter];
                        if (state === 'correct' ||
                            (state === 'present' && currentColor !== 'correct') ||
                            (state === 'absent' && !currentColor)) {
                            newKeyboardColors[letter] = state;
                        }

                        return { ...prev, board: updatedBoard, keyboardColors: { ...newKeyboardColors } };
                    });
                }, 300);

                // Remove flipping state
                setTimeout(() => {
                    setGameState(prev => {
                        const updatedBoard = prev.board.map(row => row.map(tile => ({ ...tile })));
                        updatedBoard[prev.currentRow][index] = {
                            ...updatedBoard[prev.currentRow][index],
                            isFlipping: false,
                        };
                        return { ...prev, board: updatedBoard };
                    });
                }, 600);
            }, index * 300);
        });

        // Check win/lose after all animations
        setTimeout(() => {
            const isWin = currentGuess === gameState.targetWord;
            const isLose = !isWin && gameState.currentRow === 5;

            if (isWin) {
                setGameState(prev => ({
                    ...prev,
                    gameStatus: 'won',
                    isBouncing: true,
                    message: 'Congratulations! You guessed the word!',
                    currentRow: prev.currentRow + 1,
                    currentCol: 0,
                }));
            } else if (isLose) {
                setGameState(prev => ({
                    ...prev,
                    gameStatus: 'lost',
                    message: `Game Over! The word was ${prev.targetWord}`,
                    currentRow: prev.currentRow + 1,
                    currentCol: 0,
                }));
            } else {
                setGameState(prev => ({
                    ...prev,
                    currentRow: prev.currentRow + 1,
                    currentCol: 0,
                }));
            }
        }, 5 * 300 + 600);
    }, [gameState]);

    const resetGame = useCallback(() => {
        setGameState({
            board: createEmptyBoard(),
            currentRow: 0,
            currentCol: 0,
            targetWord: getRandomWord(),
            gameStatus: 'playing',
            keyboardColors: {},
            isShaking: false,
            isBouncing: false,
            message: '',
        });
        setHasUpdatedStats(false);
    }, []);

    // Keyboard event handler
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (gameState.gameStatus !== 'playing') return;

            const key = event.key.toUpperCase();

            if (key === 'ENTER') {
                submitGuess();
            } else if (key === 'BACKSPACE') {
                removeLetter();
            } else if (/^[A-Z]$/.test(key)) {
                addLetter(key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState.gameStatus, addLetter, removeLetter, submitGuess]);

    return {
        gameState,
        stats,
        addLetter,
        removeLetter,
        submitGuess,
        resetGame,
    };
}
