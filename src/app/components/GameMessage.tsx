'use client';

interface GameMessageProps {
    message: string;
    gameStatus: 'playing' | 'won' | 'lost';
    onRestart: () => void;
}

export default function GameMessage({
    message,
    gameStatus,
    onRestart,
}: GameMessageProps) {
    if (!message && gameStatus === 'playing') return null;

    return (
        <div className="flex flex-col items-center gap-4 mt-6">
            {message && (
                <div
                    className={`
            px-6 py-3 rounded-xl text-lg font-semibold
            ${gameStatus === 'won' ? 'bg-green-600/20 text-green-400 border border-green-500/30' : ''}
            ${gameStatus === 'lost' ? 'bg-red-600/20 text-red-400 border border-red-500/30' : ''}
            ${gameStatus === 'playing' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30' : ''}
            shadow-lg
            animate-pulse
          `}
                >
                    {message}
                </div>
            )}

            {(gameStatus === 'won' || gameStatus === 'lost') && (
                <button
                    onClick={onRestart}
                    className="
            px-8 py-3
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:from-indigo-500 hover:to-purple-500
            text-white font-bold text-lg
            rounded-xl
            shadow-lg
            btn-hover
            transition-all duration-200
          "
                >
                    Play Again
                </button>
            )}
        </div>
    );
}
