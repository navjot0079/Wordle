'use client';

import { TileState } from '../hooks/useGame';

interface KeyboardProps {
    keyboardColors: Record<string, TileState>;
    onKeyPress: (key: string) => void;
    onEnter: () => void;
    onBackspace: () => void;
}

const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

export default function Keyboard({
    keyboardColors,
    onKeyPress,
    onEnter,
    onBackspace,
}: KeyboardProps) {
    const getKeyColor = (key: string): string => {
        const state = keyboardColors[key];
        switch (state) {
            case 'correct':
                return 'bg-green-600 hover:bg-green-500';
            case 'present':
                return 'bg-yellow-600 hover:bg-yellow-500';
            case 'absent':
                return 'bg-gray-700 hover:bg-gray-600';
            default:
                return 'bg-gray-500 hover:bg-gray-400';
        }
    };

    const handleKeyClick = (key: string) => {
        if (key === 'ENTER') {
            onEnter();
        } else if (key === '⌫') {
            onBackspace();
        } else {
            onKeyPress(key);
        }
    };

    return (
        <div className="flex flex-col items-center gap-1.5 mt-6">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1.5">
                    {row.map((key) => (
                        <button
                            key={key}
                            onClick={() => handleKeyClick(key)}
                            className={`
                ${key === 'ENTER' || key === '⌫' ? 'px-3 sm:px-4' : 'px-2.5 sm:px-3.5'}
                py-3 sm:py-4
                text-sm sm:text-base font-bold uppercase
                rounded-lg
                ${getKeyColor(key)}
                text-white
                shadow-md
                transition-all duration-150
                hover:scale-105
                active:scale-95 active:shadow-inner
                select-none
                min-w-[28px] sm:min-w-[40px]
              `}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}
