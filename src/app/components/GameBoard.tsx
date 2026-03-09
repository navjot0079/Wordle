'use client';

import Tile from './Tile';
import { Tile as TileType, GameStatus } from '../hooks/useGame';

interface GameBoardProps {
    board: TileType[][];
    currentRow: number;
    isShaking: boolean;
    isBouncing: boolean;
    gameStatus: GameStatus;
}

export default function GameBoard({
    board,
    currentRow,
    isShaking,
    isBouncing,
    gameStatus,
}: GameBoardProps) {
    return (
        <div
            className={`
        flex flex-col gap-1.5 p-4 rounded-xl
        ${gameStatus === 'won' ? 'success-glow' : ''}
      `}
        >
            {board.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className={`
            flex gap-1.5 p-1 rounded-lg
            ${rowIndex === currentRow && gameStatus === 'playing' ? 'active-row' : ''}
            ${rowIndex === currentRow && isShaking ? 'shake' : ''}
          `}
                >
                    {row.map((tile, colIndex) => (
                        <Tile
                            key={colIndex}
                            letter={tile.letter}
                            state={tile.state}
                            isFlipping={tile.isFlipping}
                            isRevealed={tile.isRevealed}
                            isBouncing={
                                isBouncing &&
                                rowIndex === currentRow - 1 &&
                                gameStatus === 'won'
                            }
                            bounceDelay={colIndex * 100}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
