'use client';

import { useState } from 'react';
import GameCanvas from './components/GameCanvas';
import MainMenu from './components/ui/MainMenu';
import HUD from './components/ui/HUD';
import { useGameStore } from './store';

export default function GamePage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const { health, maxHealth, ammo, maxAmmo, currentWeapon } = useGameStore();

    const handleStartGame = () => {
        setIsPlaying(true);
    };

    return (
        <div className="w-full h-screen bg-black overflow-hidden relative">
            {!isPlaying && <MainMenu onStart={handleStartGame} />}

            {isPlaying && (
                <>
                    <GameCanvas />
                    <HUD
                        health={health}
                        maxHealth={maxHealth}
                        arrows={ammo}
                        maxArrows={maxAmmo}
                        weapon={currentWeapon}
                    />
                </>
            )}
        </div>
    );
}
