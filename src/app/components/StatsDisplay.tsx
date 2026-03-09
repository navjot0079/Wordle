'use client';

export interface GameStats {
    matchesPlayed: number;
    wins: number;
    currentStreak: number;
    maxStreak: number;
}

interface StatsDisplayProps {
    stats: GameStats;
}

export default function StatsDisplay({ stats }: StatsDisplayProps) {
    const winRate = stats.matchesPlayed > 0
        ? Math.round((stats.wins / stats.matchesPlayed) * 100)
        : 0;

    return (
        <div className="flex gap-4 sm:gap-6 justify-center items-center mb-6 z-10">
            <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[70px] border border-white/10">
                <span className="text-2xl sm:text-3xl font-bold text-white">{stats.matchesPlayed}</span>
                <span className="text-xs sm:text-sm text-gray-400">Played</span>
            </div>

            <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[70px] border border-white/10">
                <span className="text-2xl sm:text-3xl font-bold text-green-400">{stats.wins}</span>
                <span className="text-xs sm:text-sm text-gray-400">Wins</span>
            </div>

            <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[70px] border border-white/10">
                <span className="text-2xl sm:text-3xl font-bold text-yellow-400">{winRate}%</span>
                <span className="text-xs sm:text-sm text-gray-400">Win Rate</span>
            </div>

            <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[70px] border border-white/10">
                <span className="text-2xl sm:text-3xl font-bold text-purple-400">{stats.currentStreak}</span>
                <span className="text-xs sm:text-sm text-gray-400">Streak</span>
            </div>

            <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[70px] border border-white/10">
                <span className="text-2xl sm:text-3xl font-bold text-indigo-400">{stats.maxStreak}</span>
                <span className="text-xs sm:text-sm text-gray-400">Best</span>
            </div>
        </div>
    );
}
