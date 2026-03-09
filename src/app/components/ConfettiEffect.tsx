'use client';

import { useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { GameStatus } from '../hooks/useGame';

interface ConfettiEffectProps {
    gameStatus: GameStatus;
}

export default function ConfettiEffect({ gameStatus }: ConfettiEffectProps) {
    const hasTriggered = useRef(false);

    const fireConfetti = useCallback(() => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: ReturnType<typeof setInterval> = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // First burst
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#22c55e', '#84cc16', '#facc15', '#f97316', '#ef4444'],
            });

            // Second burst
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e'],
            });
        }, 250);
    }, []);

    useEffect(() => {
        if (gameStatus === 'won' && !hasTriggered.current) {
            hasTriggered.current = true;
            fireConfetti();
        }

        if (gameStatus === 'playing') {
            hasTriggered.current = false;
        }
    }, [gameStatus, fireConfetti]);

    return null;
}
