'use client';

import { TileState } from '../hooks/useGame';

interface TileProps {
    letter: string;
    state: TileState;
    isFlipping: boolean;
    isRevealed: boolean;
    delay?: number;
    isBouncing?: boolean;
    bounceDelay?: number;
}

export default function Tile({
    letter,
    state,
    isFlipping,
    isRevealed,
    isBouncing = false,
    bounceDelay = 0,
}: TileProps) {
    const getBackgroundColor = () => {
        switch (state) {
            case 'correct':
                return 'bg-green-600';
            case 'present':
                return 'bg-yellow-600';
            case 'absent':
                return 'bg-gray-600';
            case 'filled':
                return 'bg-[#1a1a2e] border-gray-500';
            default:
                return 'bg-[#1a1a2e] border-[#3a3a5c]';
        }
    };

    const getBorderColor = () => {
        switch (state) {
            case 'correct':
            case 'present':
            case 'absent':
                return 'border-transparent';
            case 'filled':
                return 'border-gray-500';
            default:
                return 'border-[#3a3a5c]';
        }
    };

    return (
        <div
            className={`
        w-14 h-14 sm:w-16 sm:h-16
        flex items-center justify-center
        text-2xl sm:text-3xl font-bold uppercase
        border-2 rounded-lg
        ${getBackgroundColor()}
        ${getBorderColor()}
        ${isFlipping ? 'flip' : ''}
        ${letter && state === 'filled' ? 'pop' : ''}
        ${isBouncing ? 'bounce' : ''}
        tile-transition
        shadow-lg
        hover:scale-105
        transition-transform duration-100
      `}
            style={{
                animationDelay: isBouncing ? `${bounceDelay}ms` : '0ms',
                perspective: '1000px',
            }}
        >
            <span
                className={`
          ${isRevealed || state === 'filled' || state === 'empty' ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-150
        `}
            >
                {letter}
            </span>
        </div>
    );
}
